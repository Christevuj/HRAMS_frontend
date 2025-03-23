import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LoginAccount } from "@/config/applicant";
import { saveUserInfo } from "@/zustand/store/store.provider";
import { useNavigate } from "react-router-dom";

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        if (response.user.userType === "applicant") {
          navigate("/");
        } else if (response.user.userType === "admin") {
          navigate("/Admin/Dashboard");
        } else if (response.user.userType === "hr") {
          navigate("/OfficeHead/Dashboard");
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Background with Geometric Design */}
      <div
        className="w-1/2 h-full bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/mnt/data/image.png')",
        }}
      >
        {/* Geometric Overlay */}
        <div
          className="absolute inset-0 bg-[#e65a96] opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%), linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%)",
            backgroundSize: "40px 40px",
          }}
        ></div>

      
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <Card className="w-full max-w-md p-8 shadow-lg rounded-lg">
          <CardContent>
            <div className="text-center mb-6">
              <img src="logo.png" className="w-24 mx-auto mb-3" alt="Logo" />
              <h1 className="text-2xl font-bold text-gray-800">Log In</h1>
              <p className="text-gray-600">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Remember me</span>
                </div>
                <a href="#" className="text-[#e65a96] hover:text-[#d14a86] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#e65a96] hover:bg-[#d14a86] text-white"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-[#e65a96] hover:text-[#d14a86] hover:underline">
                Sign Up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}