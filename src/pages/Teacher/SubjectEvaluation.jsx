

import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { getDynamicExams } from "../../constants/constants";
import { FaBook, FaUsers, FaCheckCircle, FaClock, FaEye, FaPlay, FaFileAlt, FaArrowLeft } from "react-icons/fa";

const SubjectEvaluation = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      // Always prioritize exam data from navigation state
      const examFromState = location.state?.examData;
      if (examFromState) {
        setExamData([examFromState]);
      } else {
        // Fallback: load all exams and find by subjectId
        const allExams = getDynamicExams();
        setExamData(allExams);
      }
      setLoading(false);
    };

    loadData();

    // Reload data periodically to catch newly created exams
    const interval = setInterval(() => {
      const newData = getDynamicExams();
      if (newData.length !== examData.length) {
        setExamData(newData);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Find the exam by ID
  const exam = examData.find(e => e.id === subjectId);
  const students = exam?.students || [];
  const completed = students.filter(s => s.status === "evaluated").length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam data...</p>
        </div>
      </div>
    );
  }

  // Exam not found
  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Not Found</h2>
          <p className="text-gray-600 mb-6">The requested exam could not be found.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/teacher/evaluate")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 text-sm md:text-base hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft />
              Back to Exams
            </button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <FaBook className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {exam.subject}
              </h1>
              <p className="text-gray-600">{exam.title}</p>
            </div>
          </div>
          <p className="text-gray-600">
            {exam.department} • {exam.year} • Created: {new Date(exam.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaUsers className="text-blue-600" size={20} />
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Students</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{students.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaCheckCircle className="text-green-600" size={20} />
              <div>
                <p className="text-gray-600 text-sm font-medium">Evaluations Completed</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">{completed}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaClock className="text-orange-600" size={20} />
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Evaluations</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-orange-600">{students.length - completed}</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FaFileAlt className="text-blue-600" />
              Student Submissions
            </h2>
            <p className="text-gray-600 mt-1">Review and evaluate student answer sheets</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Roll Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Submission Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">
                            {student.studentName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {student.studentName}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-mono">{student.rollNo}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(student.submittedAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {student.status === "pending" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <FaClock className="mr-1" size={10} />
                          Pending
                        </span>
                      )}
                      {student.status === "evaluated" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1" size={10} />
                          Evaluated
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/teacher/evaluation/${exam.id}/${student.studentId}`}
                        state={{ examData: exam, studentData: student }}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          student.status === "evaluated"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-lg"
                        }`}
                      >
                        {student.status === "evaluated" ? (
                          <>
                            <FaEye className="mr-2" size={14} />
                            View
                          </>
                        ) : (
                          <>
                            <FaPlay className="mr-2" size={14} />
                            Evaluate
                          </>
                        )}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {students.length === 0 && (
            <div className="text-center py-12">
              <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">No students have submitted answer sheets for this exam yet.</p>
            </div>
          )}
        </div>

        {/* Exam Files Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Files</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <FaFileAlt className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Question Paper</p>
                <p className="text-sm text-gray-600">{exam.questionPaper}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <FaBook className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Answer Key</p>
                <p className="text-sm text-gray-600">{exam.answerKey}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectEvaluation;
