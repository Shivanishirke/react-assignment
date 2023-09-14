import "./App.css";
import Login from "./pages/Login";
import My_Task from "./Components/My_Task";
import My_Team from "./Components/My_Team";
import Billing from "./Components/Billing";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Header from "./pages/header";
import DeleteTask from "./modals/DeleteTask"
import Home from "./Components/Home";
import AddTask from "./Components/Routes/AddTask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (msg) => toast(msg);

function App() {
  return (
    <div className="App">
    <Home />
    <ToastContainer />
  
    </div>
  );
}

export default App;



