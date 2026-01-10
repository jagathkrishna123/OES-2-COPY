import React, { useState, useEffect } from 'react'
import { FaBell, FaCheckCircle, FaClock, FaUser, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'unread', 'read'

  // Get current teacher ID from localStorage
  const currentTeacher = JSON.parse(localStorage.getItem('teacher'))
  const currentTeacherId = currentTeacher?.id || 'T001'
  const isLoggedIn = !!currentTeacher

  useEffect(() => {
    if (isLoggedIn) {
      loadNotifications()
    }
  }, [currentTeacherId, isLoggedIn])

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in as a teacher to view notifications.</p>
        </div>
      </div>
    )
  }

  const loadNotifications = () => {
    const teacherNotifications = JSON.parse(localStorage.getItem(`teacherNotifications_${currentTeacherId}`)) || []
    setNotifications(teacherNotifications)
  }

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId && !notification.readBy?.includes(currentTeacherId)) {
        const updatedReadBy = [...(notification.readBy || []), currentTeacherId]
        const updatedNotification = { ...notification, readBy: updatedReadBy }

        // Update in localStorage
        const allTeacherNotifications = JSON.parse(localStorage.getItem(`teacherNotifications_${currentTeacherId}`)) || []
        const updatedAll = allTeacherNotifications.map(n =>
          n.id === notificationId ? updatedNotification : n
        )
        localStorage.setItem(`teacherNotifications_${currentTeacherId}`, JSON.stringify(updatedAll))

        return updatedNotification
      }
      return notification
    })

    setNotifications(updatedNotifications)
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => {
      if (!notification.readBy?.includes(currentTeacherId)) {
        const updatedReadBy = [...(notification.readBy || []), currentTeacherId]
        const updatedNotification = { ...notification, readBy: updatedReadBy }

        // Update in localStorage
        const allTeacherNotifications = JSON.parse(localStorage.getItem(`teacherNotifications_${currentTeacherId}`)) || []
        const updatedAll = allTeacherNotifications.map(n =>
          n.id === notification.id ? updatedNotification : n
        )
        localStorage.setItem(`teacherNotifications_${currentTeacherId}`, JSON.stringify(updatedAll))

        return updatedNotification
      }
      return notification
    })

    setNotifications(updatedNotifications)
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.readBy?.includes(currentTeacherId)
    if (filter === 'read') return notification.readBy?.includes(currentTeacherId)
    return true
  })

  const unreadCount = notifications.filter(n => !n.readBy?.includes(currentTeacherId)).length

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <FaExclamationTriangle className="text-red-500" />
      case 'normal': return <FaInfoCircle className="text-blue-500" />
      case 'low': return <FaInfoCircle className="text-gray-500" />
      default: return <FaInfoCircle className="text-blue-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'normal': return 'border-l-blue-500 bg-blue-50'
      case 'low': return 'border-l-gray-500 bg-gray-50'
      default: return 'border-l-blue-500 bg-blue-50'
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 font-out">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <FaBell className="text-blue-600" />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-gray-600">
                Stay updated with important announcements and messages from the Exam Controller.
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaCheckCircle />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex bg-white rounded-lg p-1 border border-gray-200">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'read', label: 'Read', count: notifications.length - unreadCount }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FaBell className="text-gray-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'unread' ? 'No unread notifications' :
                 filter === 'read' ? 'No read notifications' :
                 'No notifications yet'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' ? 'All caught up!' :
                 filter === 'read' ? 'Read notifications will appear here' :
                 'Notifications from the Exam Controller will appear here'}
              </p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const isRead = notification.readBy?.includes(currentTeacherId)

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm border-l-4 p-6 transition-all duration-200 hover:shadow-md ${
                    getPriorityColor(notification.priority)
                  } ${!isRead ? 'ring-2 ring-blue-200' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getPriorityIcon(notification.priority)}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!isRead && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" size={14} />
                          <span>From: {notification.sender}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-gray-400" size={14} />
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {!isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="ml-4 flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <FaCheckCircle size={14} />
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </div>
        )}
      </div>
    </div>
  )
}

export default Notification
