import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setError("Invalid email format.");
    }
    if (!validatePassword(password)) {
      return setError(
        "Password must be 8+ characters and include a number and symbol.",
      );
    }

    localStorage.setItem("token", "mock-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8] px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FFF00]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FFF00]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7FFF00] text-white font-bold py-2 rounded-lg hover:bg-[#6ee700] transition"
          >
            Continue
          </button>
        </form>

        {/* <p className="text-center text-sm text-gray-500 mt-6">
        New here? <a href="#" className="text-[#7FFF00] font-medium">Create account</a>
      </p> */}
      </div>
    </div>
  );
}
