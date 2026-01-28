// import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import TeacherLayout from "./pages/Teacher/TeacherLayout";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import AddStudent from "./pages/Teacher/AddStudent";
import ManageStudents from "./pages/Teacher/ManageStudents";
import AddSubject from "./pages/Teacher/AddSubject";
import EvaluateExam from "./pages/Teacher/EvaluateExam";
import Notification from "./pages/Teacher/Notification";
import ControllerLayout from "./pages/Examcontroller/ControllerLayout";
import ControllerDashboard from "./pages/Examcontroller/ControllerDashboard";
import CreateExam from "./pages/Examcontroller/CreateExam";
import ManageTeacher from "./pages/Examcontroller/ManageTeacher";
import AddDepartment from "./pages/Examcontroller/AddDepartment";
import ContollerNotification from "./pages/Examcontroller/ContollerNotification";
import ManageResults from "./pages/Examcontroller/ManageResults";
import SubjectEvaluation from "./pages/Teacher/SubjectEvaluation";
import StudentEvaluation from "./pages/Teacher/StudentEvaluation";
import ScrollToTop from "./components/ScrollToTop";
import AllStudents from "./pages/Examcontroller/AllStudents";
import StudentResults from "./components/StudentResults";
const App = () => {
  const { pathname } = useLocation();
  const hideLayout = pathname.includes("admin") || pathname.includes("teacher") || pathname.includes("controller");
  // useEffect(() => {
  //   localStorage.clear();   // 🔥 clears whole project data
  // }, []);

  return (
    <div>
      <ScrollToTop/>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/results" element={<StudentResults />} />
        <Route path="/results/:studentId" element={<StudentResults />} />
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="managestudents" element={<ManageStudents />} />
          <Route path="addsubject" element={<AddSubject />} />
          <Route path="evaluate" element={<EvaluateExam />} /> {/* fixed */}
          <Route
            path="evaluation/:subjectId"
            element={<SubjectEvaluation />}
          />{" "}
          {/* subject list */}
          <Route
            path="evaluation/:subjectId/:studentId"
            element={<StudentEvaluation />}
          />{" "}
          {/* per-student */}
          <Route path="notification" element={<Notification />} />
        </Route>

        <Route path="/controller" element={<ControllerLayout />}>
          <Route index element={<ControllerDashboard />} />
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="manage-teacher" element={<ManageTeacher />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route
            path="controllernotification"
            element={<ContollerNotification />}
          />
          <Route path="resultsmanage-" element={<ManageResults />} />
          <Route path="allstudents" element={<AllStudents/>} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
