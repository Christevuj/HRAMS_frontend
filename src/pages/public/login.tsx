import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginAccount } from "@/config/applicant";
import { saveUserInfo } from "@/zustand/store/store.provider";
import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  message?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      const response = await LoginAccount(formDataToSend);

      if (response) {
        toast.success("Login successful!");
        saveUserInfo(response.user);
        localStorage.setItem("token", response.token);
        navigate(response.user.userType === "admin" ? "/Admin/Dashboard" : "/");
      }
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Gradient Background with Image */}
      <div
        className="w-1/2 hidden md:flex bg-cover bg-center relative"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #e55474, rgba(255, 255, 255, 0.3)), url(/bg.jpg)',
        }}
      >
        {/* Logo */}
        <img
          src="/Logowhite.png"
          alt="Logo"
          className="absolute"
          style={{
            top: "15%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            width: "350px",
            height: "auto",
          }}
        />

        {/* Text Overlays */}
        <h1
          className="text-white text-5xl font-bold absolute"
          style={{
            top: "var(--text-top, 29%)",
            left: "var(--text-left, 68%)",
            transform: "translate(-50%, -50%)",
          }}
        >
          HR Applicant
        </h1>
        <h1
          className="text-white text-5xl font-bold absolute"
          style={{
            top: "var(--text-top, 37%)",
            left: "var(--text-left, 20%)",
            transform: "translate(28%, -50%)",
          }}
        >
          Management System
        </h1>

        {/* Draggable Text Box */}
        <div
          className="absolute bg-white rounded-lg p-4 text-center text-black font-semibold resize"
          style={{
            top: "45%",
            left: "74%",
            transform: "translate(-50%, -50%)",
            minWidth: "200px",
            minHeight: "10px",
          }}
        >
          <h1
            className="text-white text-3xl font-bold absolute"
            style={{
              top: `${300}px`,
              left: `${-80}px`,
              transform: "translate(-50%, -50%)",
              width: "500%",
              textAlign: "center",
              cursor: "grab",
            }}
          >
            Manage all new applicants with comfort
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#e54f70" }}>
          Log In
        </h1>
        <h2 className="text-lg text-gray-600 mb-8">Login to your account.</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {/* Email Input */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#e54f70" }}
            >
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 w-full text-base p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#e54f70" }}
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-12 w-full text-base p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 w-5 h-5 border border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full text-white text-lg py-3 rounded-lg"
            style={{ backgroundColor: "#e54f70", borderColor: "#e54f70" }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}