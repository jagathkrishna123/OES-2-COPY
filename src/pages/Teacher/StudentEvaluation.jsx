import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getAllExams } from "../../constants/constants";
import { FaFileAlt, FaKey, FaArrowLeft, FaSave, FaEye, FaCheckCircle, FaTimes, FaExpand, FaCompress } from "react-icons/fa";

const StudentEvaluation = () => {
  const { examId, studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("questionPaper");
  const [marks, setMarks] = useState({});
  const [outOfMarks, setOutOfMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalPossibleMarks, setTotalPossibleMarks] = useState(0);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);

  // Load exam data on mount and when params change
  useEffect(() => {
    const loadData = () => {
      const allExams = getAllExams();
      setExamData(allExams);
      setDataLoaded(true);
    };

    // Load data immediately
    loadData();

    // Also load data after a delay to ensure any newly created exams are loaded
    const timeoutId = setTimeout(() => {
      const refreshedExams = getAllExams();
      if (refreshedExams.length !== examData.length) {
        setExamData(refreshedExams);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [examId, studentId]);

  // Get exam data from navigation state if available, otherwise from loaded data
  const examFromState = location.state?.examData;
  const exam = examFromState || examData.find(e => e.id === examId);
  const student = exam?.students?.find(s => s.studentId === studentId);

  // If exam not found and data is loaded, try reloading data
  useEffect(() => {
    if (dataLoaded && !exam) {
      console.log("Exam not found, reloading data...");
      const refreshedData = getAllExams();
      setExamData(refreshedData);

      const refreshedExam = refreshedData.find(e => e.id === examId);
      if (refreshedExam) {
        console.log("Found exam after reload:", refreshedExam.id);
      } else {
        console.log("Still no exam found after reload");
      }
    }
  }, [dataLoaded, exam, examId]);

  // Loading state - show loading if no exam data available yet
  if (!dataLoaded && !exam) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam data...</p>
        </div>
      </div>
    );
  }

  // Exam not found - only show after data has loaded and no exam from state
  if (dataLoaded && !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Not Found</h2>
          <p className="text-gray-600">The requested exam could not be found.</p>
          <button
            onClick={() => navigate("/teacher")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Student not found
  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h2>
          <p className="text-gray-600">The requested student evaluation could not be found.</p>
          <button
            onClick={() => navigate(`/teacher/evaluation/${examId}`)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Subject Evaluation
          </button>
        </div>
      </div>
    );
  }

  // Initialize marks and out-of marks for each question based on questionCount
  useEffect(() => {
    if (exam && student) {
      const initialMarks = {};
      const initialOutOfMarks = {};
      for (let i = 1; i <= questionCount; i++) {
        initialMarks[`q${i}`] = 0; // Start with 0 marks
        initialOutOfMarks[`q${i}`] = 10; // Default to 10 marks
      }
      setMarks(initialMarks);
      setOutOfMarks(initialOutOfMarks);
      calculateTotal();
    }
  }, [exam, student, questionCount]);

  const calculateTotal = () => {
    // Only calculate for current question count
    let total = 0;
    let totalPossible = 0;

    for (let i = 1; i <= questionCount; i++) {
      const questionKey = `q${i}`;
      const markValue = parseFloat(marks[questionKey]) || 0;
      const outOfValue = parseFloat(outOfMarks[questionKey]) || 0;

      total += markValue;
      totalPossible += outOfValue;
    }

    console.log(`Calculated totals: ${total}/${totalPossible} for ${questionCount} questions`);
    setTotalMarks(total);
    setTotalPossibleMarks(totalPossible);
  };

  const handleMarkChange = (question, value) => {
    const newMarks = { ...marks, [question]: parseFloat(value) || 0 };
    setMarks(newMarks);
    calculateTotal();
  };

  const handleOutOfMarksChange = (question, value) => {
    const newOutOfMarks = { ...outOfMarks, [question]: parseFloat(value) || 0 };
    setOutOfMarks(newOutOfMarks);
    calculateTotal();
  };

  const handleSubmit = async () => {
    if (totalMarks > totalPossibleMarks) {
      alert(`Total marks cannot exceed ${totalPossibleMarks}!`);
      return;
    }

    setLoading(true);

    try {
      // Here you would typically send the evaluation data to your backend
      // For demo purposes, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      // Update the student status to evaluated in EXAMDATA (in real app, this would be done via API)
      const updatedExam = {
        ...exam,
        students: exam.students.map(s =>
          s.studentId === studentId
            ? { ...s, status: "evaluated", marks: totalMarks, evaluationDate: new Date().toISOString() }
            : s
        )
      };

      // In a real application, you would update this via API
      console.log("Evaluation submitted:", {
        examId,
        studentId,
        marks,
        totalMarks,
        comments
      });

      alert(`Evaluation submitted successfully!\nTotal Marks: ${totalMarks}/${totalPossibleMarks}`);

      // Navigate back to subject evaluation
      navigate(`/teacher/evaluation/${examId}`);

    } catch (error) {
      alert("Failed to submit evaluation. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/teacher/evaluation/${examId}`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 text-[13px] md:text-[16px] hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft />
                Back to Subject
              </button>
              <div>
                <h1 className="text-[15px] sm:text-md md:text-3xl font-bold text-gray-900">{exam.subject}</h1>
                <p className="text-gray-600 text-[13px] md:text-[16px]">{exam.title}</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-md md:text-lg font-semibold text-gray-900">{student.studentName}</h3>
              <p className="text-gray-600 text-[13px] md:text-[15px]">Roll: {student.rollNo}</p>
            </div>
          </div>
        </div>

        {/* Question Count Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Evaluation Settings</h3>
              <p className="text-sm text-gray-600">Set the number of questions to evaluate</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Number of Questions:</label>
              <select
                value={questionCount}
                onChange={(e) => {
                  const newCount = parseInt(e.target.value);
                  setQuestionCount(newCount);

                  // Clean up marks and out-of-marks to only include current questions
                  const newMarks = {};
                  const newOutOfMarks = {};
                  for (let i = 1; i <= newCount; i++) {
                    newMarks[`q${i}`] = marks[`q${i}`] || 0;
                    newOutOfMarks[`q${i}`] = outOfMarks[`q${i}`] || 10;
                  }
                  setMarks(newMarks);
                  setOutOfMarks(newOutOfMarks);

                  // Calculate totals with the cleaned data
                  calculateTotal();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>

          {/* Left Panel - Question Paper & Answer Key */}
          {!isFullscreen && (
            <div className="space-y-6">

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("questionPaper")}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === "questionPaper"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <FaFileAlt className="inline mr-2" />
                  Question Paper
                </button>
                <button
                  onClick={() => setActiveTab("answerKey")}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === "answerKey"
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <FaKey className="inline mr-2" />
                  Answer Key
                </button>
              </div>

              <div className="p-6">
                {activeTab === "questionPaper" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <FaFileAlt className="text-blue-600 text-xl" />
                      <h3 className="text-lg font-semibold text-gray-900">Question Paper</h3>
                    </div>

                    {/* Question Paper PDF Display */}
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-300">
                      <h4 className="font-semibold text-gray-900 mb-4">{exam.subject} - Question Paper</h4>

                      <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
                        <iframe
                          src={exam.questionPaper}
                          className="w-full h-full"
                          title={`${exam.subject} - Question Paper`}
                          style={{ border: 'none' }}
                        />
                      </div>

                      <div className="text-center text-gray-500 text-sm mt-4">
                        Question Paper - {exam.subject}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <FaKey className="text-green-600 text-xl" />
                      <h3 className="text-lg font-semibold text-gray-900">Answer Key</h3>
                    </div>

                    {/* Answer Key PDF Display */}
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Answer Key - {exam.subject}</h4>

                      <div className="w-full h-[500px] border rounded-lg overflow-hidden">
                        <iframe
                          src={exam.answerKey}
                          className="w-full h-full"
                          title={`${exam.subject} - Answer Key`}
                          style={{ border: 'none' }}
                        />
                      </div>

                      <div className="text-center text-gray-500 text-sm mt-4">
                        Answer Key - {exam.subject}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          )}

          {/* Right Panel - Student Answer Sheet & Marking */}
          <div className="space-y-6">

            {/* Student Answer Sheet */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaEye className="text-purple-600 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-900">Student Answer Sheet</h3>
                  </div>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                    <span className="text-sm font-medium">
                      {isFullscreen ? "Minimize" : "Fullscreen"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Student Answer Sheet PDF Display */}
                <div className="mb-6 mt-10">
                  <h4 className="font-semibold text-gray-900 mb-4">Student Answer Sheet</h4>
                  <div className="w-full h-[500px] border rounded-lg overflow-hidden">
                    <iframe
                      src={student.answerSheet}
                      className="w-full h-full"
                      title={`${student.studentName} - Answer Sheet`}
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>

                {/* Question-wise Marking */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Question-wise Evaluation</h4>
                  {Array.from({ length: questionCount }, (_, i) => i + 1).map((q) => (
                    <div key={q} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-gray-900">Question {q}</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max={outOfMarks[`q${q}`] || 10}
                            value={marks[`q${q}`] || 0}
                            onChange={(e) => handleMarkChange(`q${q}`, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                            placeholder="0"
                          />
                          <span className="text-sm text-gray-600">/</span>
                          <select
                            value={outOfMarks[`q${q}`] || 10}
                            onChange={(e) => handleOutOfMarksChange(`q${q}`, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm bg-white"
                          >
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>Mark the student's answer for Question {q}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Marking Summary & Comments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Total Marks</span>
                  <span className="text-xl font-bold text-blue-600">{totalMarks}/{totalPossibleMarks}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any comments about the student's performance..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Submit Evaluation
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigate(`/teacher/evaluation/${examId}`)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEvaluation;
