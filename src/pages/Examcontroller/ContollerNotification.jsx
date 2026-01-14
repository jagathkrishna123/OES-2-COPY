import React, { useState, useEffect, useRef } from 'react'
import { FaBell, FaUser, FaUsers, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

const ContollerNotification = () => {
  const [notificationType, setNotificationType] = useState('all') // 'all' or 'specific'
  const [selectedTeachers, setSelectedTeachers] = useState([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState('normal') // 'low', 'normal', 'high'
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [activeTeachers, setActiveTeachers] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Load existing notifications
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('controllerNotifications')) || []
    setNotifications(savedNotifications)
  }, [])

  // Load teachers from localStorage
  useEffect(() => {
    const savedTeachers = JSON.parse(localStorage.getItem('teachers')) || []
    const filteredTeachers = savedTeachers.filter(teacher => teacher.status === 'active')
    setActiveTeachers(filteredTeachers)
    console.log('Active Teachers:', filteredTeachers)
  }, [])

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeachers(prev =>
      prev.includes(teacherId)
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTeachers.length === activeTeachers.length) {
      setSelectedTeachers([])
    } else {
      setSelectedTeachers(activeTeachers.map(teacher => teacher.teacherId))
    }
  }

  const getSelectedTeachersText = () => {
    if (selectedTeachers.length === 0) return 'Select teachers...'
    if (selectedTeachers.length === 1) {
      const teacher = activeTeachers.find(t => t.teacherId === selectedTeachers[0])
      return teacher ? `${teacher.name} (${teacher.department})` : 'Select teachers...'
    }
    return `${selectedTeachers.length} teachers selected`
  }

  const sendNotification = async () => {
    if (!title.trim() || !message.trim()) {
      alert('Please fill in both title and message')
      return
    }

    if (notificationType === 'specific' && selectedTeachers.length === 0) {
      alert('Please select at least one teacher')
      return
    }

    setLoading(true)

    try {
      const newNotification = {
        id: Date.now().toString(),
        title: title.trim(),
        message: message.trim(),
        priority,
        type: notificationType,
        recipients: notificationType === 'all' ? 'all' : selectedTeachers,
        sender: 'Exam Controller',
        timestamp: new Date().toISOString(),
        readBy: []
      }

      // Save to controller notifications
      const updatedNotifications = [newNotification, ...notifications]
      setNotifications(updatedNotifications)
      localStorage.setItem('controllerNotifications', JSON.stringify(updatedNotifications))

      // Also save to teacher notifications
      if (notificationType === 'all') {
        // Send to all active teachers
        activeTeachers.forEach(teacher => {
          const teacherNotifications = JSON.parse(localStorage.getItem(`teacherNotifications_${teacher.teacherId}`)) || []
          teacherNotifications.unshift({
            ...newNotification,
            recipientId: teacher.teacherId,
            recipientName: teacher.name
          })
          localStorage.setItem(`teacherNotifications_${teacher.teacherId}`, JSON.stringify(teacherNotifications))
        })
      } else {
        // Send to specific teachers
        selectedTeachers.forEach(teacherId => {
          const teacher = activeTeachers.find(t => t.teacherId === teacherId)
          if (teacher) {
            const teacherNotifications = JSON.parse(localStorage.getItem(`teacherNotifications_${teacherId}`)) || []
            teacherNotifications.unshift({
              ...newNotification,
              recipientId: teacherId,
              recipientName: teacher.name
            })
            localStorage.setItem(`teacherNotifications_${teacherId}`, JSON.stringify(teacherNotifications))
          }
        })
      }

      // Reset form
      setTitle('')
      setMessage('')
      setPriority('normal')
      setSelectedTeachers([])
      setNotificationType('all')

      alert('Notification sent successfully!')

    } catch (error) {
      console.error('Error sending notification:', error)
      alert('Failed to send notification. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId)
    setNotifications(updatedNotifications)
    localStorage.setItem('controllerNotifications', JSON.stringify(updatedNotifications))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'normal': return 'text-blue-600 bg-blue-100'
      case 'low': return 'text-gray-600 bg-gray-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 font-out">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaBell className="text-blue-600" />
            Send Notifications
          </h1>
          <p className="text-gray-600">
            Send notifications to teachers about important updates and announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Notification Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-blue-600" />
              Compose Notification
            </h2>

            <div className="space-y-6">
              {/* Notification Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Send to:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="notificationType"
                      value="all"
                      checked={notificationType === 'all'}
                      onChange={(e) => setNotificationType(e.target.value)}
                      className="mr-2"
                    />
                    <FaUsers className="mr-2 text-blue-600" />
                    All Teachers
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="notificationType"
                      value="specific"
                      checked={notificationType === 'specific'}
                      onChange={(e) => setNotificationType(e.target.value)}
                      className="mr-2"
                    />
                    <FaUser className="mr-2 text-green-600" />
                    Specific Teachers
                  </label>
                </div>
              </div>

              {/* Teacher Selection Dropdown */}
              {notificationType === 'specific' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Teachers:
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-left flex items-center justify-between"
                    >
                      <span className={selectedTeachers.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                        {getSelectedTeachersText()}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2">
                          <button
                            type="button"
                            onClick={handleSelectAll}
                            className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                          >
                            {selectedTeachers.length === activeTeachers.length ? 'Deselect All' : 'Select All'}
                          </button>
                          <div className="border-t border-gray-200 my-2"></div>
                          {activeTeachers.length === 0 ? (
                            <p className="text-sm text-gray-500 p-2">No teachers available</p>
                          ) : (
                            activeTeachers.map(teacher => (
                              <label key={teacher.teacherId} className="flex items-center px-2 py-2 hover:bg-gray-50 cursor-pointer rounded">
                                <input
                                  type="checkbox"
                                  checked={selectedTeachers.includes(teacher.teacherId)}
                                  onChange={() => handleTeacherSelect(teacher.teacherId)}
                                  className="mr-3"
                                />
                                <span className="text-sm text-gray-700">
                                  {teacher.name} ({teacher.department})
                                </span>
                              </label>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedTeachers.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedTeachers.length} teacher{selectedTeachers.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>
              )}

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority:
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter notification message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Send Button */}
              <button
                onClick={sendNotification}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Notification
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sent Notifications History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaBell className="text-blue-600" />
              Sent Notifications
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No notifications sent yet.</p>
              ) : (
                notifications.map(notification => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>To: {notification.type === 'all' ? 'All Teachers' : `${notification.recipients.length} Teachers`}</span>
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete notification"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContollerNotification
