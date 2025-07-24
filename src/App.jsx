import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Parcels from "./pages/Parcels";
import Agents from "./pages/Agents";
import Vendors from "./pages/Vendors";
import Wallet from "./pages/Wallet";
import Reports from "./pages/Reports";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/parcels"
          element={
            <RequireAuth>
              <Parcels />
            </RequireAuth>
          }
        />
        <Route
          path="/agents"
          element={
            <RequireAuth>
              <Agents />
            </RequireAuth>
          }
        />
        <Route
          path="/vendors"
          element={
            <RequireAuth>
              <Vendors />
            </RequireAuth>
          }
        />
        <Route
          path="/wallet"
          element={
            <RequireAuth>
              <Wallet />
            </RequireAuth>
          }
        />
        <Route
          path="/reports"
          element={
            <RequireAuth>
              <Reports />
            </RequireAuth>
          }
        />
        {/* Redirect root to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
