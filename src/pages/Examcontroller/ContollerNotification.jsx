import React, { useState, useEffect } from 'react'
import { TEACHERSDATA } from '../../constants/constants'
import { FaBell, FaUser, FaUsers, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

const ContollerNotification = () => {
  const [notificationType, setNotificationType] = useState('all') // 'all' or 'specific'
  const [selectedTeachers, setSelectedTeachers] = useState([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState('normal') // 'low', 'normal', 'high'
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  // Load existing notifications
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('controllerNotifications')) || []
    setNotifications(savedNotifications)
  }, [])

  const activeTeachers = TEACHERSDATA.filter(teacher => teacher.status === 'active')

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
      setSelectedTeachers(activeTeachers.map(teacher => teacher.id))
    }
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
          const teacherNotifications = JSON.parse(localStorage.getItem(`teacherNotifications_${teacher.id}`)) || []
          teacherNotifications.unshift({
            ...newNotification,
            recipientId: teacher.id,
            recipientName: teacher.name
          })
          localStorage.setItem(`teacherNotifications_${teacher.id}`, JSON.stringify(teacherNotifications))
        })
      } else {
        // Send to specific teachers
        selectedTeachers.forEach(teacherId => {
          const teacher = activeTeachers.find(t => t.id === teacherId)
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

              {/* Teacher Selection */}
              {notificationType === 'specific' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Teachers:
                    </label>
                    <button
                      onClick={handleSelectAll}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {selectedTeachers.length === activeTeachers.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {activeTeachers.map(teacher => (
                      <label key={teacher.id} className="flex items-center py-2">
                        <input
                          type="checkbox"
                          checked={selectedTeachers.includes(teacher.id)}
                          onChange={() => handleTeacherSelect(teacher.id)}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          {teacher.name} ({teacher.department})
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {selectedTeachers.length} teacher(s)
                  </p>
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
