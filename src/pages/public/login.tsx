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
      {/* Left Side - Image Background */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/login_bg.png')",
        }}
      ></div>

      {/* Right Side - Login Form */}
<div className="w-1/2 flex items-center justify-center bg-white">
<Card className="w-full max-w-xl min-h-[32rem] p-10 rounded-2xl flex flex-col justify-center bg-white border-0 shadow-none">

    <CardContent>
    <div className="text-center mb-8">
  <h1 className="text-5xl font-bold text-gray-800 mb-4">Log In</h1>
  <p className="text-gray-600">Login to your account</p>
</div>


            <form onSubmit={handleSubmit} className="space-y-6">
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


          </CardContent>
        </Card>
      </div>
    </div>
  );
}
