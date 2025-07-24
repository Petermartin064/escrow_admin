import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Parcels", path: "/parcels" },
  { label: "Agents", path: "/agents" },
  { label: "Vendors", path: "/vendors" },
  { label: "Wallet", path: "/wallet" },
  { label: "Reports", path: "/reports" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#7FFF00]">
            Escrow Admin
          </h2>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded font-medium ${
                  location.pathname === item.path
                    ? "bg-[#7FFF00] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-auto">
        <div className="h-full p-6">{children}</div>
      </div>
    </div>
  );
}
