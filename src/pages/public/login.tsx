/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const navigate = useNavigate()
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
      const formDataToSend = new FormData()
      formDataToSend.append("email",formData.email)
      formDataToSend.append("password",formData.password)
      const response = await LoginAccount(formDataToSend)

      if (response) {
        toast.success("Login successful!");
        saveUserInfo(response.user)
        localStorage.setItem("token", response.token); 
        if(response.user.userType === 'applicant'){
          navigate('/')
        } else if(response.user.userType === 'admin'){
          navigate('/Admin/Dashboard')
        } else if(response.user.userType === 'hr'){
          navigate('/OfficeHead/Dashboard')
        }
      } 
    } catch (error:any) {
      console.error(error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="container mx-auto flex items-center gap-8 h-max">
        <div className="hidden items-center justify-end bg-white md:flex relative">
          <img src="/signup-1.png" alt="Illustration" className="w-3/4 h-auto z-10" />
          <div className="absolute inset-0 bg-white opacity-90" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center items-center">
        <img src="logo.png" className="w-48 mb-2" alt="Logo" />
        <Card className="flex w-full max-w-2xl py-12 flex-col text-white items-center justify-center  bg-gradient-to-b from-pink-500 to-pink-300 rounded-md">
          <CardContent className="w-full max-w-xl">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-2xl font-bold">Sign in to account</h1>
              <p className="mb-6 text-center">
              Enter your email address & password to login
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-white">Remember me</span>
                </div>
                <a href="#" className="text-white hover:underline">Reset password</a>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center mt-6 text-sm text-white">
              Don't have an account? <a href="/register" className="text-white hover:underline">Sign Up</a>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
