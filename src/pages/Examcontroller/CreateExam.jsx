import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { EXAMDATA, addNewExam } from "../../constants/constants";
import { FaPlus, FaTrash, FaUpload, FaFileAlt, FaBook, FaUsers, FaKey, FaRedo } from "react-icons/fa";

const CreateExam = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [departments, setDepartments] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [refreshingStudents, setRefreshingStudents] = useState(false);
  const lastStudentCountRef = useRef(0);

  const [exam, setExam] = useState({
    title: "",
    department: "",
    year: "",
    subject: "",
  });

  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerKey, setAnswerKey] = useState(null);

  const [students, setStudents] = useState([
    { studentId: "", rollNo: "", file: null },
  ]);

  // Helper function to load students from localStorage
  const loadStudentsFromStorage = () => {
    setRefreshingStudents(true);
    try {
      const savedStudents = localStorage.getItem("addedStudents");
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setAllStudents(parsedStudents);
          lastStudentCountRef.current = parsedStudents.length;
        } else {
          setAllStudents([]);
          lastStudentCountRef.current = 0;
        }
      } else {
        setAllStudents([]);
        lastStudentCountRef.current = 0;
      }
    } catch (error) {
      console.error("Error loading students from localStorage:", error);
      setAllStudents([]);
      lastStudentCountRef.current = 0;
    } finally {
      setTimeout(() => setRefreshingStudents(false), 500); // Show loading state briefly
    }
  };

  // Load departments and students from localStorage on component mount
  useEffect(() => {
    try {
      const savedDepartments = localStorage.getItem("departments");
      if (savedDepartments) {
        const parsedDepartments = JSON.parse(savedDepartments);
        if (Array.isArray(parsedDepartments)) {
          setDepartments(parsedDepartments);
        } else {
          setDepartments([]);
        }
      } else {
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error loading departments from localStorage:", error);
      setDepartments([]);
    }

    // Load students from localStorage
    loadStudentsFromStorage();

    // Set up periodic refresh to check for new students added by other components
    const refreshInterval = setInterval(() => {
      try {
        const savedStudents = localStorage.getItem("addedStudents");
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          if (Array.isArray(parsedStudents)) {
            // Check if there are new students by comparing against the ref
            if (parsedStudents.length !== lastStudentCountRef.current) {
              setAllStudents(parsedStudents);
              lastStudentCountRef.current = parsedStudents.length;
              console.log("🔄 Students list refreshed:", parsedStudents.length, "students found");
            }
          }
        }
      } catch (error) {
        console.error("Error refreshing students from localStorage:", error);
      }
    }, 2000); // Check every 2 seconds

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, []); // Empty dependency array to run only on mount

  /* ======================
     HANDLERS
     ====================== */

  const handleExamChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setExam({ ...exam, department: value, year: "", subject: "" });
      setStudents([{ studentId: "", rollNo: "", file: null }]);
      // Reload students from localStorage when department changes to get latest data
      loadStudentsFromStorage();
    } else if (name === "year") {
      setExam({ ...exam, year: value, subject: "" });
      setStudents([{ studentId: "", rollNo: "", file: null }]);
      // Reload students from localStorage when year changes to get latest data
      loadStudentsFromStorage();
    } else {
      setExam({ ...exam, [name]: value });
    }
  };

  const handleStudentChange = (index, studentId) => {
    const student = allStudents.find((s) => s.id === studentId);

    const updated = [...students];
    updated[index] = {
      ...updated[index],
      studentId,
      rollNo: student?.studentRoll || "",
    };

    setStudents(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...students];
    updated[index].file = file;
    setStudents(updated);
  };

  const addStudent = () => {
    setStudents([...students, { studentId: "", rollNo: "", file: null }]);
  };

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  /* ======================
     FILTERED DATA
     ====================== */

  // Find selected department from localStorage data
  const selectedDepartment = departments.find(
    (d) => d.name === exam.department
  );

  // Get available years from selected department
  const availableYears = selectedDepartment 
    ? Object.keys(selectedDepartment.years || {})
    : [];

  // Get available subjects for selected department and year
  const availableSubjects =
    selectedDepartment && exam.year && selectedDepartment.years[exam.year]
      ? selectedDepartment.years[exam.year]
      : [];

  // Filter students based on selected department and year from localStorage
  const filteredStudents = allStudents.filter(
    (s) => s.department === exam.department && s.year === exam.year
  );

  /* ======================
     MESSAGE HANDLER
     ====================== */

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  /* ======================
     SUBMIT
     ====================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!exam.title || !exam.department || !exam.year || !exam.subject) {
      showMessage("❌ Please fill in all required exam details.", "error");
      return;
    }

    if (!questionPaper) {
      showMessage("❌ Please upload the question paper.", "error");
      return;
    }

    if (!answerKey) {
      showMessage("❌ Please upload the answer key.", "error");
      return;
    }

    if (students.length === 0 || students.some(s => !s.studentId || !s.file)) {
      showMessage("❌ Please add at least one student with their answer sheet.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", exam.title);
    formData.append("department", exam.department);
    formData.append("year", exam.year);
    formData.append("subject", exam.subject);
    formData.append("questionPaper", questionPaper);
    formData.append("answerKey", answerKey);

    students.forEach((student, index) => {
      formData.append(`students[${index}][studentId]`, student.studentId);
      formData.append(`students[${index}][rollNo]`, student.rollNo);
      formData.append(`students[${index}][file]`, student.file);
    });

    try {
      setLoading(true);

      // For demo purposes, we'll simulate API success and add to local EXAMDATA
      // In a real application, this would be handled by the backend
      const newExamId = `EXAM${String(EXAMDATA.length + 1).padStart(3, '0')}`;

      const newExam = {
        id: newExamId,
        title: exam.title,
        department: exam.department,
        year: exam.year,
        subject: exam.subject,
        questionPaper: questionPaper?.name || "question_paper.pdf",
        answerKey: answerKey?.name || "answer_key.pdf",
        createdAt: new Date().toISOString(),
        status: "active",
        students: students.map(student => ({
          studentId: student.studentId,
          studentName: allStudents.find(s => s.id === student.studentId)?.studentName || "Unknown",
          rollNo: student.rollNo,
          answerSheet: student.file?.name || "answer_sheet.pdf",
          submittedAt: new Date().toISOString(),
          status: "pending"
        }))
      };

      // Add to dynamic exam data (in real app, this would be handled by backend)
      addNewExam(newExam);

      // Uncomment below for actual API call:
      /*
      await axios.post("http://localhost:5000/api/exams/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      */

      showMessage("✅ Exam created successfully! All files have been uploaded.", "success");

      // Reset form
      setExam({
        title: "",
        department: "",
        year: "",
        subject: "",
      });
      setQuestionPaper(null);
      setAnswerKey(null);
      setStudents([{ studentId: "", rollNo: "", file: null }]);

    } catch (err) {
      console.error("Error creating exam:", err);
      showMessage("❌ Failed to create exam. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 font-out">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaBook className="text-blue-600" />
            Create New Exam
          </h1>
          <p className="text-gray-600">
            Set up a new examination with question paper, answer key, and student answer sheets.
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message}
          </div>
        )}

        {/* Warning Message if no departments exist */}
        {departments.length === 0 && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
            <p className="font-medium mb-1">⚠️ No Departments Available</p>
            <p className="text-sm">
              Please create a department with subjects first by going to <strong>Create Department</strong> page before creating an exam.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Exam Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaFileAlt className="text-blue-600" />
              Exam Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exam Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={exam.title}
                  onChange={handleExamChange}
                  placeholder="e.g., Mid-term Examination 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={exam.department}
                  onChange={handleExamChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.length === 0 ? (
                    <option disabled>No departments available. Please create a department first.</option>
                  ) : (
                    departments.map((d) => (
                      <option key={d.id || d.name} value={d.name}>{d.name}</option>
                    ))
                  )}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={exam.year}
                  onChange={handleExamChange}
                  disabled={!exam.department || availableYears.length === 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Year</option>
                  {availableYears.length === 0 && exam.department ? (
                    <option disabled>No years available for this department</option>
                  ) : (
                    availableYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))
                  )}
                </select>
              </div>

              {/* Subject */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={exam.subject}
                  onChange={handleExamChange}
                  disabled={!exam.year}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Subject</option>
                  {availableSubjects.length === 0 && exam.year ? (
                    <option disabled>No subjects available for this year</option>
                  ) : (
                    availableSubjects.map((sub, i) => (
                      <option key={i} value={sub}>{sub}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* File Uploads Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaUpload className="text-blue-600" />
              File Uploads
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question Paper */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Question Paper <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setQuestionPaper(e.target.files[0])}
                    className="hidden"
                    id="questionPaper"
                    required
                  />
                  <label
                    htmlFor="questionPaper"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-center">
                      <FaFileAlt className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {questionPaper ? questionPaper.name : "Click to upload question paper"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Answer Key */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Answer Key <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setAnswerKey(e.target.files[0])}
                    className="hidden"
                    id="answerKey"
                    required
                  />
                  <label
                    htmlFor="answerKey"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <div className="text-center">
                      <FaKey className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {answerKey ? answerKey.name : "Click to upload answer key"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Student Answer Sheets Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                Student Answer Sheets
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={loadStudentsFromStorage}
                  disabled={refreshingStudents}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all duration-300 text-sm font-medium"
                  title="Refresh student list"
                >
                  <FaRedo size={14} className={refreshingStudents ? 'animate-spin' : ''} />
                  {refreshingStudents ? 'Refreshing...' : 'Refresh Students'}
                </button>
                <button
                  type="button"
                  onClick={addStudent}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 text-sm font-medium"
                >
                  <FaPlus size={14} />
                  Add Student
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {students.map((student, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Student {index + 1}</h3>
                    {students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStudent(index)}
                        className="flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
                      >
                        <FaTrash size={12} />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Student Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Student <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={student.studentId}
                        onChange={(e) => handleStudentChange(index, e.target.value)}
                        disabled={!exam.department || !exam.year || filteredStudents.length === 0}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                      >
                        <option value="">
                          {!exam.department || !exam.year
                            ? "Select Department & Year First"
                            : filteredStudents.length === 0
                            ? "No students available for this department/year"
                            : "Choose student"}
                        </option>
                        {filteredStudents.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.studentName} ({s.studentRoll})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Roll Number (Auto-filled) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value={student.rollNo}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                        placeholder="Auto-filled"
                      />
                    </div>

                    {/* Answer Sheet Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer Sheet <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(index, e.target.files[0])}
                          className="hidden"
                          id={`answerSheet-${index}`}
                          required
                        />
                        <label
                          htmlFor={`answerSheet-${index}`}
                          className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm"
                        >
                          <div className="text-center">
                            {student.file ? (
                              <span className="text-green-600 font-medium">{student.file.name}</span>
                            ) : (
                              <span className="text-gray-500">Upload answer sheet</span>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FaUsers className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No students added yet. Click "Add Student" to get started.</p>
              </div>
            )}

            {/* Warning if no students available for selected department/year */}
            {exam.department && exam.year && filteredStudents.length === 0 && (
              <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
                <p className="font-medium mb-1">⚠️ No Students Available</p>
                <p className="text-sm">
                  No students found for <strong>{exam.department}</strong> - <strong>{exam.year}</strong>. 
                  Please add students for this department and year first using the <strong>Add Student</strong> page.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Exam...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaUpload />
                  Create Exam
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
