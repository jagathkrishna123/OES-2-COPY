import React, { useState, useEffect } from 'react'
import { getDynamicExams } from '../../constants/constants'
import { 
  FaBook, 
  FaUsers, 
  FaCheckCircle, 
  FaEye, 
  FaDownload, 
  FaFileAlt,
  FaSchool,
  FaCalendarAlt,
  FaChartBar,
  FaUpload,
  FaEdit,
  FaSearch,
  FaFilter
} from 'react-icons/fa'

const ManageResults = () => {
  const [exams, setExams] = useState([])
  const [completedExams, setCompletedExams] = useState([])
  const [filteredExams, setFilteredExams] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    department: "all",
    year: "all",
    published: "all"
  })
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [lastExamCount, setLastExamCount] = useState(0)

  // Load exams and published status on mount and periodically refresh
  useEffect(() => {
    loadExams()

    // Set up periodic refresh to check for newly submitted results
    const interval = setInterval(() => {
      loadExams()
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const loadExams = () => {
    const allExams = getDynamicExams()
    setExams(allExams)

    // Filter exams that are submitted by teachers (ready for controller approval)
    const submitted = allExams.filter(exam => {
      const students = exam.students || []
      if (students.length === 0) return false
      // Must have all students evaluated AND status should be "submitted"
      return students.every(student => student.status === "evaluated") && exam.status === "submitted"
    })

    // Check if we have new submitted exams
    if (submitted.length > lastExamCount && lastExamCount > 0) {
      showMessage(`📬 New exam results submitted for review! (${submitted.length} total pending)`, "info")
    }
    setLastExamCount(submitted.length)

    // Load published status from localStorage
    const publishedExams = JSON.parse(localStorage.getItem('publishedResults') || '[]')

    // Add published status to submitted exams
    const examsWithStatus = submitted.map(exam => ({
      ...exam,
      isPublished: publishedExams.includes(exam.id)
    }))

    setCompletedExams(examsWithStatus)
  }

  // Filter exams whenever search or filters change
  useEffect(() => {
    let filtered = [...completedExams]

    // Filter by department
    if (filters.department !== "all") {
      filtered = filtered.filter(exam => exam.department === filters.department)
    }

    // Filter by year
    if (filters.year !== "all") {
      filtered = filtered.filter(exam => exam.year === filters.year)
    }

    // Filter by published status
    if (filters.published !== "all") {
      const isPublished = filters.published === "published"
      filtered = filtered.filter(exam => exam.isPublished === isPublished)
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(exam =>
        exam.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.department?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredExams(filtered)
  }, [completedExams, searchTerm, filters])

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  const showMessage = (text, type = "success") => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 4000)
  }

  const handlePublish = (examId) => {
    if (window.confirm("Are you sure you want to publish these results? Once published, results will be visible to students.")) {
      const publishedExams = JSON.parse(localStorage.getItem('publishedResults') || '[]')

      if (!publishedExams.includes(examId)) {
        // Add to published results
        publishedExams.push(examId)
        localStorage.setItem('publishedResults', JSON.stringify(publishedExams))

        // Update the exam status to completed and add published date
        const allExams = getDynamicExams()
        const examToUpdate = allExams.find(exam => exam.id === examId)
        if (examToUpdate) {
          const updatedExam = {
            ...examToUpdate,
            status: "completed",
            publishedDate: new Date().toISOString()
          }
          // Update the exam in localStorage
          const updatedExams = allExams.map(exam =>
            exam.id === examId ? updatedExam : exam
          )
          localStorage.setItem('dynamicExams', JSON.stringify(updatedExams))
        }

        // Update local state
        setCompletedExams(prev =>
          prev.map(exam =>
            exam.id === examId ? { ...exam, isPublished: true, status: "completed", publishedDate: new Date().toISOString() } : exam
          )
        )

        showMessage("✅ Results published successfully! Students can now view their results.", "success")
      } else {
        showMessage("Results are already published.", "error")
      }
    }
  }

  const handleUnpublish = (examId) => {
    if (window.confirm("Are you sure you want to unpublish these results? Students will no longer be able to view them.")) {
      const publishedExams = JSON.parse(localStorage.getItem('publishedResults') || '[]')
      const updated = publishedExams.filter(id => id !== examId)
      localStorage.setItem('publishedResults', JSON.stringify(updated))
      
      // Update local state
      setCompletedExams(prev => 
        prev.map(exam => 
          exam.id === examId ? { ...exam, isPublished: false } : exam
        )
      )
      
      showMessage("Results unpublished successfully.", "success")
    }
  }

  const handleViewResults = (exam) => {
    // Navigate to view detailed results (you can implement navigation here)
    console.log("View results for:", exam.id)
    showMessage(`Viewing results for ${exam.subject}...`, "success")
  }

  const handleDownloadResults = (exam) => {
    // Generate and download results (you can implement CSV/PDF generation here)
    console.log("Download results for:", exam.id)
    showMessage(`Downloading results for ${exam.subject}...`, "success")
  }

  // Get unique departments and years for filters
  const uniqueDepartments = [...new Set(completedExams.map(e => e.department))].filter(Boolean)
  const uniqueYears = [...new Set(completedExams.map(e => e.year))].filter(Boolean)

  // Calculate statistics
  const totalCompleted = completedExams.length
  const publishedCount = completedExams.filter(e => e.isPublished).length
  const unpublishedCount = completedExams.filter(e => !e.isPublished).length
  const totalStudents = completedExams.reduce((sum, exam) => sum + (exam.students?.length || 0), 0)

  // Calculate average marks for an exam
  const calculateAverageMarks = (exam) => {
    const students = exam.students || []
    const evaluatedStudents = students.filter(s => s.status === "evaluated" && s.marks !== undefined)
    if (evaluatedStudents.length === 0) return 0
    const sum = evaluatedStudents.reduce((acc, s) => acc + (s.marks || 0), 0)
    return sum / evaluatedStudents.length
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 font-out">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaBook className="text-blue-600" />
            Manage Results
          </h1>
          <p className="text-gray-600">
            View and manage completed evaluations. Publish results to make them visible to students.
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed Evaluations</p>
                <p className="text-3xl font-bold text-gray-900">{totalCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Published Results</p>
                <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaUpload className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unpublished Results</p>
                <p className="text-3xl font-bold text-yellow-600">{unpublishedCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FaFileAlt className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students Evaluated</p>
                <p className="text-3xl font-bold text-purple-600">{totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters & Search</h2>
            </div>
            <button
              onClick={() => loadExams()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Refresh results"
            >
              <FaSearch className="text-sm" />
              Refresh
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Subjects
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by exam title, subject, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange("department", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              >
                <option value="all">All Departments</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              >
                <option value="all">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Status
              </label>
              <select
                value={filters.published}
                onChange={(e) => handleFilterChange("published", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              >
                <option value="all">All Results</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Completed Exams List */}
        {filteredExams.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FaBook className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {completedExams.length === 0 
                ? "No Completed Evaluations" 
                : "No Results Match Your Filters"}
            </h3>
            <p className="text-gray-600">
              {completedExams.length === 0
                ? "No subjects have completed evaluations yet. Results will appear here once all students are evaluated."
                : "Try adjusting your search criteria or filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExams.map((exam) => {
              const students = exam.students || []
              const evaluatedCount = students.filter(s => s.status === "evaluated").length
              const averageMarks = calculateAverageMarks(exam)

              return (
                <div
                  key={exam.id}
                  className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                    exam.isPublished 
                      ? "border-green-300" 
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <FaBook className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{exam.subject}</h3>
                            <p className="text-sm text-gray-500">{exam.title}</p>
                          </div>
                        </div>
                      </div>
                      {exam.isPublished && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          <FaCheckCircle size={12} />
                          Published
                        </span>
                      )}
                    </div>

                    {/* Exam Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <FaSchool className="text-green-500 flex-shrink-0" />
                        <span><strong>Department:</strong> {exam.department} | {exam.year}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <FaUsers className="text-blue-500 flex-shrink-0" />
                        <span><strong>Students Evaluated:</strong> {evaluatedCount} / {students.length}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <FaChartBar className="text-purple-500 flex-shrink-0" />
                        <span><strong>Average Marks:</strong> {averageMarks.toFixed(1)} / 100</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <FaCalendarAlt className="text-orange-500 flex-shrink-0" />
                        <span><strong>Created:</strong> {new Date(exam.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleViewResults(exam)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-300 font-medium text-sm"
                      >
                        <FaEye size={14} />
                        View Results
                      </button>

                      <button
                        onClick={() => handleDownloadResults(exam)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium text-sm"
                      >
                        <FaDownload size={14} />
                        Download
                      </button>

                      {exam.isPublished ? (
                        <button
                          onClick={() => handleUnpublish(exam.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all duration-300 font-medium text-sm mt-2"
                        >
                          <FaEdit size={14} />
                          Unpublish Results
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePublish(exam.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 hover:to-emerald-600 transition-all duration-300 font-medium text-sm mt-2 shadow-md hover:shadow-lg"
                        >
                          <FaUpload size={14} />
                          Publish Results
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageResults
