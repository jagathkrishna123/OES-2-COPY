import React, { useState, useEffect } from "react";

const AddSubject = () => {
  const [teacher, setTeacher] = useState({ id: "", name: "" });
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    department: "",
    teacherId: "",
    teacherName: "",
  });

  // Load teacher info from localStorage (or Context later)
  useEffect(() => {
    const storedTeacher = JSON.parse(localStorage.getItem("teacher"));

    if (storedTeacher) {
      setTeacher({
        id: storedTeacher.id,
        name: storedTeacher.name,
      });

      setFormData((prev) => ({
        ...prev,
        teacherId: storedTeacher.id,
        teacherName: storedTeacher.name,
      }));
    }
  }, []);

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Electrical",
    "Civil",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subjectName || !formData.department) {
      setMessage("❌ Please fill all required fields.");
      return;
    }

    // For now just console. Later connect API:
    console.log("Subject Added:", formData);

    setMessage("✅ Subject added successfully!");

    setFormData({
      subjectName: "",
      subjectCode: "",
      department: "",
      teacherId: teacher.id,
      teacherName: teacher.name,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 px-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 border border-gray-400">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-6 text-center">
          Add Subject (Teacher Dashboard)
        </h2>

        {/* Status Message */}
        {message && (
          <div className="mb-5 p-3 text-sm rounded-lg text-center font-medium 
          bg-blue-100 text-blue-700 border border-blue-300">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Teacher Info */}
          <div className="bg-gray-50 p-3 rounded-lg border">
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Teacher:</span> {teacher.name}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Teacher ID:</span> {teacher.id}
            </p>
          </div>

          {/* Subject Name */}
          <div>
            <label className="block text-gray-500 font-medium mb-1">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg text-gray-500
               focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter subject name"
            />
          </div>

          {/* Subject Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject Code
            </label>
            <input
              type="text"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg text-gray-500
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter subject code (optional)"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-500 font-medium mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white text-gray-500 
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg text-lg
            hover:bg-gray-700 transition-all font-semibold shadow-md"
          >
            Add Subject
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddSubject;
