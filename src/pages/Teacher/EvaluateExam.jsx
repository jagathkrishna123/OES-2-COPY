import React, { useState, useEffect } from "react";
import { getDynamicExams } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { FaBook, FaClock, FaCheckCircle, FaUsers, FaFileAlt } from "react-icons/fa";

const EvaluateExam = () => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const newData = getDynamicExams();
      setExamData(newData);
    };

    loadData();

    // Reload data periodically to catch newly created exams
    const interval = setInterval(() => {
      loadData();
      setRefreshTrigger(prev => prev + 1); // Force re-render
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaFileAlt className="text-blue-600" />
          Evaluate Exams
        </h1>
        <p className="text-gray-600">
          Review and evaluate student answer sheets for assigned examinations.
        </p>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examData.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500">
              <FaFileAlt className="mx-auto h-16 w-16 mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Exams Available</h3>
              <p>Please create exams from the Exam Controller section.</p>
            </div>
          </div>
        ) : (
          examData.map((exam) => {
          const totalStudents = exam.students.length;
          const evaluatedStudents = exam.students.filter(s => s.status === "evaluated").length;
          const pendingStudents = totalStudents - evaluatedStudents;
          const percentage = totalStudents > 0 ? Math.round((evaluatedStudents / totalStudents) * 100) : 0;

          return (
            <div
              key={exam.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Exam Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{exam.title}</h2>
                  <p className="text-sm text-gray-600">{exam.subject} - {exam.department}</p>
                  <p className="text-xs text-gray-500 mt-1">{exam.year}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  exam.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {exam.status === "completed" ? "Completed" : "Active"}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FaUsers className="text-blue-500" size={14} />
                    <span className="text-sm text-gray-600">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FaClock className="text-orange-500" size={14} />
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{pendingStudents}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Evaluation Progress</span>
                  <span>{evaluatedStudents}/{totalStudents} Completed</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      percentage === 100 ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{percentage}% Complete</p>
              </div>

              {/* Creation Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <FaClock size={12} />
                <span>Created: {new Date(exam.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  // Force reload of exam data before navigation
                  const freshData = getDynamicExams();
                  console.log("EvaluateExam - navigating to exam:", exam.id, "with fresh data:", freshData.length, "exams");
                  navigate(`/teacher/evaluation/${exam.id}`);
                }}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  exam.status === "completed"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {exam.status === "completed" ? (
                  <>
                    <FaCheckCircle />
                    View Results
                  </>
                ) : (
                  <>
                    <FaBook />
                    Evaluate Students
                  </>
                )}
              </button>
            </div>
          );
        }))}
      </div>

      {/* Summary Stats */}
      {examData.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{examData.length}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {examData.filter(e => e.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Exams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {examData.filter(e => e.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Completed Exams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {examData.reduce((total, exam) => total + exam.students.filter(s => s.status === "pending").length, 0)}
              </div>
              <div className="text-sm text-gray-600">Pending Evaluations</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluateExam;
