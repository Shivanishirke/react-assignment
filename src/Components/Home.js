import React, { Suspense } from "react";
import WithdSidebar from "./Routes/WithSidebar";
import { Route, Routes } from "react-router-dom";
// import My_Task from "./My_Task";
// import Login from "../pages/Login";
import ProtectedRoute from "./Routes/protectedRoutes";
import PublicRoute from "./Routes/PublicRoute";
// import Dashboard from "../pages/Dashboard";

const My_Task = React.lazy(() => import("./My_Task"))
const Login = React.lazy(() => import("../pages/Login"))
const Dashboard = React.lazy(() => import("../pages/Dashboard"))


const Home = () => {
  return (
    <div>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route element={<WithdSidebar />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/myTask" element={<My_Task />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
      </Suspense>
    </div>
  );
};

export default Home;
