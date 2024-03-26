import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import History from "./pages/History";
import "./styles.css";

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />}  />
              <Route path="/login" element={<Login />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
