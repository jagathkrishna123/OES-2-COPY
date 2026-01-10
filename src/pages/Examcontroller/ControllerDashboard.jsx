import React from "react";
import { FaUsers, FaSchool, FaBell, FaBook, FaClipboardCheck, FaChartLine, FaClock, FaCheckCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const ControllerDashboard = () => {
  const stats = [
    {
      title: "Total Teachers",
      value: 18,
      change: "+2",
      changeType: "increase",
      icon: <GiTeacher size={24} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Total Departments",
      value: 5,
      change: "0",
      changeType: "neutral",
      icon: <FaSchool size={24} />,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      title: "Total Students",
      value: 240,
      change: "+12",
      changeType: "increase",
      icon: <FaUsers size={24} />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "Total Subjects",
      value: 14,
      change: "+1",
      changeType: "increase",
      icon: <FaBook size={24} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Pending Evaluations",
      value: 34,
      change: "-5",
      changeType: "decrease",
      icon: <MdPendingActions size={24} />,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      title: "Evaluated Papers",
      value: 186,
      change: "+23",
      changeType: "increase",
      icon: <FaClipboardCheck size={24} />,
      color: "from-teal-500 to-teal-600",
      bgColor: "from-teal-50 to-teal-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      message: "New exam created for BSc Computer Science",
      time: "2 hours ago",
      type: "exam",
      icon: <FaBook className="text-blue-600" />,
    },
    {
      id: 2,
      message: "3 answer sheets uploaded in Physics department",
      time: "4 hours ago",
      type: "upload",
      icon: <FaClipboardCheck className="text-green-600" />,
    },
    {
      id: 3,
      message: "Teacher Asha evaluated 12 papers",
      time: "6 hours ago",
      type: "evaluation",
      icon: <FaCheckCircle className="text-teal-600" />,
    },
    {
      id: 4,
      message: "Department of Commerce added new subject",
      time: "1 day ago",
      type: "department",
      icon: <FaSchool className="text-purple-600" />,
    },
    {
      id: 5,
      message: "System maintenance completed successfully",
      time: "2 days ago",
      type: "system",
      icon: <FaChartLine className="text-orange-600" />,
    },
  ];

  const quickActions = [
    {
      title: "Create Exam",
      description: "Set up new examination",
      icon: <FaBook className="text-blue-600" />,
      bgColor: "bg-blue-50",
      action: "create-exam"
    },
    {
      title: "Manage Teachers",
      description: "Add or remove teachers",
      icon: <GiTeacher className="text-green-600" />,
      bgColor: "bg-green-50",
      action: "manage-teachers"
    },
    {
      title: "Add Department",
      description: "Create new department",
      icon: <FaSchool className="text-purple-600" />,
      bgColor: "bg-purple-50",
      action: "add-department"
    },
    {
      title: "View Reports",
      description: "Check performance reports",
      icon: <FaChartLine className="text-orange-600" />,
      bgColor: "bg-orange-50",
      action: "view-reports"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Controller Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's an overview of your examination system.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-700">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.bgColor} border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                {item.icon}
              </div>
              <div className="flex items-center gap-1">
                {item.changeType === "increase" && (
                  <BsArrowUp className="text-green-600" size={14} />
                )}
                {item.changeType === "decrease" && (
                  <BsArrowDown className="text-red-600" size={14} />
                )}
                <span className={`text-sm font-medium ${
                  item.changeType === "increase" ? "text-green-600" :
                  item.changeType === "decrease" ? "text-red-600" : "text-gray-600"
                }`}>
                  {item.change}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{item.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{item.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaBell className="text-blue-600" />
              Quick Actions
            </h2>

            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`w-full p-4 ${action.bgColor} border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 text-left group`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaClock className="text-blue-600" />
              Recent Activities
            </h2>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaClock size={10} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-medium">
                View All Activities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FaChartLine className="text-blue-600" />
          System Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCheckCircle className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">System Status</h3>
            <p className="text-sm text-green-600 font-medium">All Systems Operational</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaUsers className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Active Users</h3>
            <p className="text-sm text-gray-600">258 users online</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaClipboardCheck className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Today's Exams</h3>
            <p className="text-sm text-gray-600">12 exams scheduled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControllerDashboard;
