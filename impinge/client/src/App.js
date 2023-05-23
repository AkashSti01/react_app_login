import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./Component/Account";
import Dashboard from "./Component/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
