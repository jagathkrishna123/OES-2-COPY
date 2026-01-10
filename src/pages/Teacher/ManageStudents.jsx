import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSort, FaUsers, FaFilter, FaSave, FaTimes } from "react-icons/fa";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [teacher, setTeacher] = useState({ id: "", name: "" });

  const [editFormData, setEditFormData] = useState({
    studentName: "",
    studentRoll: "",
    department: "",
    year: "",
  });

  const [availableYears, setAvailableYears] = useState([]);

  // Load teacher info, students, and departments
  useEffect(() => {
    try {
      const storedTeacher = localStorage.getItem("teacher");
      if (storedTeacher) {
        const parsedTeacher = JSON.parse(storedTeacher);
        if (parsedTeacher) {
          setTeacher(parsedTeacher);
        }
      }
    } catch (error) {
      console.error("Error loading teacher data:", error);
    }

    // Load departments from localStorage
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
      console.error("Error loading departments:", error);
      setDepartments([]);
    }

    // Load students (both dummy and added)
    loadStudents();
  }, []);

  const loadStudents = () => {
    // Load only added students from localStorage
    try {
      const savedStudents = localStorage.getItem("addedStudents");
      if (savedStudents) {
        const addedStudents = JSON.parse(savedStudents);
        if (Array.isArray(addedStudents)) {
          setStudents(addedStudents);
          setFilteredStudents(addedStudents);
        } else {
          setStudents([]);
          setFilteredStudents([]);
        }
      } else {
        setStudents([]);
        setFilteredStudents([]);
      }
    } catch (error) {
      console.error("Error loading added students:", error);
      setStudents([]);
      setFilteredStudents([]);
    }
  };

  // Filter students by department
  useEffect(() => {
    if (students.length === 0) {
      setFilteredStudents([]);
      return;
    }

    let filtered = [...students];

    if (selectedDepartment) {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }

    // Sort by department
    filtered.sort((a, b) => {
      const deptA = a.department.toLowerCase();
      const deptB = b.department.toLowerCase();

      if (sortOrder === "asc") {
        return deptA.localeCompare(deptB);
      } else {
        return deptB.localeCompare(deptA);
      }
    });

    setFilteredStudents(filtered);
  }, [students, selectedDepartment, sortOrder]);

  // Handle department change for editing
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    const dept = departments.find((d) => d.name === department);
    setAvailableYears(dept ? Object.keys(dept.years) : []);

    setEditFormData({
      ...editFormData,
      department: department,
      year: "", // Reset year when department changes
    });
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudent(student.id);

    // Find department and set available years
    if (departments.length > 0) {
      const dept = departments.find((d) => d.name === student.department);
      setAvailableYears(dept ? Object.keys(dept.years) : []);
    } else {
      // If no departments loaded yet, set empty array
      setAvailableYears([]);
    }

    setEditFormData({
      studentName: student.studentName,
      studentRoll: student.studentRoll,
      department: student.department,
      year: student.year,
    });
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  // Save edited student
  const handleSaveEdit = () => {
    if (!editFormData.studentName || !editFormData.studentRoll ||
        !editFormData.department || !editFormData.year) {
      showMessage("❌ Please fill all required fields.", "error");
      return;
    }

    const updatedStudents = students.map(student =>
      student.id === editingStudent
        ? {
            ...student,
            studentName: editFormData.studentName,
            studentRoll: editFormData.studentRoll,
            department: editFormData.department,
            year: editFormData.year,
          }
        : student
    );

    setStudents(updatedStudents);

    // Save all changes to localStorage
    try {
      localStorage.setItem("addedStudents", JSON.stringify(updatedStudents));
    } catch (error) {
      console.error("Error saving student changes:", error);
    }

    setEditingStudent(null);
    showMessage("✅ Student updated successfully!", "success");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setMessage("");
  };

  // Delete student
  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter(student => student.id !== studentId);
      setStudents(updatedStudents);

      // Save changes to localStorage
      try {
        localStorage.setItem("addedStudents", JSON.stringify(updatedStudents));
      } catch (error) {
        console.error("Error saving student deletion:", error);
      }

      showMessage("✅ Student deleted successfully!", "success");
    }
  };

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaUsers className="text-blue-600" />
          Manage Students
        </h1>
        <p className="text-gray-600">
          View, edit, and manage all registered students in the system.
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
          messageType === "success"
            ? "bg-green-100 text-green-700 border border-green-300"
            : messageType === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Teacher Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaUsers className="text-blue-600" />
            Teacher Info
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FaUsers className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{teacher.name || "Not logged in"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <FaUsers className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Added Students</p>
                <p className="font-medium text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="lg:col-span-3">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaFilter className="text-purple-600" />
              Filters & Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaFilter className="text-purple-500" />
                  Filter by Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">All Departments</option>
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No departments available</option>
                  )}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={toggleSort}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  <FaSort />
                  Sort by Department ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                </button>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Added Students ({filteredStudents.length} {selectedDepartment && `filtered by ${selectedDepartment}`})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Roll Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Found</h3>
                      <p className="text-gray-600">
                        {selectedDepartment
                          ? `No students found in ${selectedDepartment} department.`
                          : "No students have been added yet. Use the 'Add Student' form to add students."
                        }
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <input
                            type="text"
                            name="studentName"
                            value={editFormData.studentName}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Student name"
                          />
                        ) : (
                          <div className="font-medium">{student.studentName}</div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <input
                            type="text"
                            name="studentRoll"
                            value={editFormData.studentRoll}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Roll number"
                          />
                        ) : (
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                            {student.studentRoll}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <select
                            name="department"
                            value={editFormData.department}
                            onChange={handleDepartmentChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          >
                            <option value="">Select Department</option>
                            {departments.length > 0 ? (
                              departments.map((dept) => (
                                <option key={dept.id} value={dept.name}>
                                  {dept.name}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>No departments available</option>
                            )}
                          </select>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {student.department}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <select
                            name="year"
                            value={editFormData.year}
                            onChange={handleEditChange}
                            disabled={!editFormData.department}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {editFormData.department ? "Select Year" : "Select Department First"}
                            </option>
                            {availableYears.map((yr) => (
                              <option key={yr} value={yr}>
                                {yr}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {student.year}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {editingStudent === student.id ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                title="Save changes"
                              >
                                <FaSave className="mr-1" size={10} />
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                                title="Cancel editing"
                              >
                                <FaTimes className="mr-1" size={10} />
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(student)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                                title="Edit student"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(student.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                                title="Delete student"
                              >
                                <FaTrash size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
