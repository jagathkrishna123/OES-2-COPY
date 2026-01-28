

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDynamicExams } from "../constants/constants";
import {
  FaArrowLeft,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";

const StudentResults = () => {
  const navigate = useNavigate();
  const [groupedResults, setGroupedResults] = useState([]);
  const [expandedExamId, setExpandedExamId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");


  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const exams = getDynamicExams();
    const publishedExams = JSON.parse(
      localStorage.getItem("publishedResults") || "[]"
    );

    const results = [];

    exams.forEach((exam) => {
      if (!publishedExams.includes(exam.id)) return;

      const students = exam.students.filter(
        (s) => s.status === "evaluated"
      );

      if (students.length) {
        const totalMarks =
          exam.totalMarks ??
          Math.max(...students.map(s => s.outOfMarks || s.marks));


        results.push({
          examId: exam.id,
          examTitle: exam.title,
          department: exam.department,
          subject: exam.subject,
          year: exam.year,
          totalMarks,
          students,
        });

      }
    });

    setGroupedResults(results);
    setLoading(false);
  };

  const departments = [
    "all",
    ...new Set(groupedResults.map((e) => e.department)),
  ];

  const years = [
    "all",
    ...new Set(groupedResults.map((e) => e.year)),
  ];


  //filter logic
  const filteredResults = groupedResults.filter((exam) => {
    const deptMatch =
      selectedDepartment === "all" ||
      exam.department === selectedDepartment;

    const yearMatch =
      selectedYear === "all" || exam.year === selectedYear;

    return deptMatch && yearMatch;
  });

  const toggleExpand = (id) => {
    setExpandedExamId(expandedExamId === id ? null : id);
  };
  const gradeBadgeFromPercentage = (percentage) => {
    if (percentage >= 90) return "bg-green-100 text-green-700";
    if (percentage >= 80) return "bg-green-100 text-green-700";
    if (percentage >= 70) return "bg-blue-100 text-blue-700";
    if (percentage >= 60) return "bg-blue-100 text-blue-700";
    if (percentage >= 50) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };




  const getGradeFromPercentage = (marks, total) => {
    if (!total || total === 0) return "N/A";

    const percentage = (marks / total) * 100;

    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 pt-20 font-out">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft /> Back to Home
        </button>

        <h1 className="text-4xl font-bold text-center mb-10">
          📘 Exam Results
        </h1>
        <div className="mb-10">
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">

      {/* Title */}
      <div className="flex items-center gap-3 text-blue-600">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <FaChartBar />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Results
          </h2>
          <p className="text-sm text-gray-500">
            Narrow down by department & year
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

        {/* Department */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="min-w-[180px] px-4 py-2 rounded-xl border border-gray-300 bg-gray-50
                       focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400
                       transition"
          >
            {departments.map((dept, i) => (
              <option key={i} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Academic Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="min-w-[150px] px-4 py-2 rounded-xl border border-gray-300 bg-gray-50
                       focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400
                       transition"
          >
            {years.map((year, i) => (
              <option key={i} value={year}>
                {year === "all" ? "All Years" : year}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  </div>
</div>



        <div className="space-y-6">
          {filteredResults.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No results found for selected filters
            </div>
          )}
          {filteredResults.map((exam) => {
            const totalStudents = exam.students.length;
            // const avg =
            //   exam.students.reduce((a, s) => a + s.marks, 0) /
            //   totalStudents;
            const avg =
              exam.students.reduce((a, s) => a + s.marks, 0) / totalStudents;


            return (
              <div
                key={exam.examId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-300 overflow-hidden"
              >
                {/* Card Header */}
                <div
                  onClick={() => toggleExpand(exam.examId)}
                  className="p-6 cursor-pointer flex justify-between items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FaBook className="text-xl" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">
                        {exam.department} – {exam.subject}
                      </h3>
                      <p className="text-sm opacity-90">
                        {exam.examTitle} • {exam.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaUsers /> {totalStudents}
                    </span>
                    {expandedExamId === exam.examId ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                </div>

                {/* Expanded Section */}
                {expandedExamId === exam.examId && (
                  <div className="p-6 space-y-6 animate-fadeIn">

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <StatCard
                        label="Students"
                        value={totalStudents}
                      />
                      <StatCard
                        label="Average Marks"
                        value={`${Math.max(...exam.students.map(s => s.marks))} / ${exam.totalMarks}`}

                      />
                      <StatCard
                        label="Highest"
                        value={Math.max(
                          ...exam.students.map((s) => s.marks)
                        )}
                      />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-3 text-left">Roll No</th>
                            <th className="p-3 text-left">Student</th>
                            <th className="p-3 text-left">Marks</th>
                            <th className="p-3 text-left">Grade</th>
                            <th className="p-3 text-left">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exam.students.map((s, i) => (
                            <tr
                              key={i}
                              className="border-t border-gray-400 hover:bg-gray-50"
                            >
                              <td className="p-3">{s.rollNo}</td>
                              <td className="p-3">{s.studentName}</td>
                              <td className="p-3 font-semibold">
                                {s.marks}/{exam.totalMarks}
                              </td>
                              <td className="p-3">

                                {(() => {
                                  const percentage = (s.marks / exam.totalMarks) * 100;

                                  return (
                                    <span
                                      className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeBadgeFromPercentage(
                                        percentage
                                      )}`}
                                    >
                                      {getGradeFromPercentage(s.marks, exam.totalMarks)}
                                    </span>
                                  );
                                })()}

                              </td>
                              <td className="p-3 text-sm text-gray-600">
                                {new Date(
                                  s.evaluationDate
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 shadow-sm">
    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
      <FaChartBar />
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default StudentResults;
