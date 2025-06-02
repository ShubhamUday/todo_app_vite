import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
      <div>
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
