import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CreateUser } from "@/config/applicant";

interface FormDataState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function RegistrationPage() {
  const router = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      toast.error("You must agree to the Terms & Conditions.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      const response = await CreateUser(formDataToSend)

      if (response) {
        toast.success("Registration successful!");
        router("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 h-max w-full">
        <div className="hidden md:flex items-center justify-center bg-white w-1/2 relative">
          <img src="/register.jpg" alt="Illustration" className="w-full h-auto z-10 object-contain" />
          <div className="absolute inset-0 bg-white opacity-90" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center items-center">
        <img src="logo.png" className="w-48 mb-2" alt="Logo" />
        <Card className="flex w-full py-12 flex-col text-white items-center justify-center flex-1 bg-gradient-to-b from-pink-500 to-pink-300 rounded-md">
          <CardContent className="w-full max-w-2xl">
            <div className="flex flex-col justify-center items-start">
            <h3 className="text-white text-2xl font-bold">Create your account </h3>
              <p className="mb-6 text-center font-medium">Enter your personal details to create account</p>
            </div>

            <form className="w-full" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Full Name</label>
                <Input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className="w-full" required />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Email</label>
                <Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full" required />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Password</label>
                <Input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="w-full" required />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Confirm Password</label>
                <Input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className="w-full" required />
              </div>

              <div className="flex items-center justify-between text-sm mb-6">
                <div className="flex items-center">
                  <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mr-2" />
                  <span className="text-white">I agree to the Terms & Conditions</span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center mt-6 text-sm text-white">
              Already have an account? <a href="/login" className="text-white hover:underline">Log In</a>
            </div>
          </CardContent>
        </Card>
        </div>

      </div>
    </div>
  );
}
