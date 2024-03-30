import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contextes/AuthContext";
import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import History from "./pages/History";
import { HistoryProvider } from './contextes/HistoryContext';
import "./styles.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <HistoryProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </BrowserRouter>
        </HistoryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
