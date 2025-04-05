import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { logoutUser } from "@/zustand/store/store.provider";

const HeadHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    department: "",
    deanName: "",
    positionTitle: "",
    employmentType: "",
    jobDescription: "",
    minQualifications: "",
    education: "",
    experience: "",
    certifications: "",
    preferredQualifications: "",
    reasonForOpening: "",
    urgency: ""
  });

  const handleLogout = () => {
    logoutUser(); 
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    toast.success("Request submitted successfully");
    setIsModalOpen(false);
    setFormData({
      date: "",
      department: "",
      deanName: "",
      positionTitle: "",
      employmentType: "",
      jobDescription: "",
      minQualifications: "",
      education: "",
      experience: "",
      certifications: "",
      preferredQualifications: "",
      reasonForOpening: "",
      urgency: ""
    });
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white px-6 py-3 shadow">
        {/* Left: Brand + Nav */}
        <div className="flex items-center space-x-8">
          {/* Brand */}
          <div className="text-xl font-bold text-gray-800 tracking-wide">
            <img
              src="/logo.png"
              className="w-16  rounded-sm p-2"
              alt="Logo"
            />
          </div>

          {/* Navigation Menu */}
          {/* <nav className="flex space-x-4">
            <a
              href="/Admin/Dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/Job-list"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Jobs
            </a>
          </nav> */}
        </div>

        {/* Right: Settings, Add New, Logout, Avatar */}
        <div className="flex items-center space-x-4">
          {/* <Button variant="default">Settings</Button> */}
          <Button variant="default" onClick={() => setIsModalOpen(true)}>Add New</Button>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl p-6 bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">New Vacancy Request</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input name="date" value={formData.date} onChange={handleInputChange} placeholder="Date of Request" />
              <Input name="department" value={formData.department} onChange={handleInputChange} placeholder="Department Name" />
              <Input name="deanName" value={formData.deanName} onChange={handleInputChange} placeholder="Requesting Dean’s Name" />
              <Input name="positionTitle" value={formData.positionTitle} onChange={handleInputChange} placeholder="Position Title Requested" />
              <Input name="employmentType" value={formData.employmentType} onChange={handleInputChange} placeholder="Employment Type" />
              <Textarea name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} placeholder="Job Description / Duties and Responsibilities" />
              <Textarea name="minQualifications" value={formData.minQualifications} onChange={handleInputChange} placeholder="Minimum Qualifications Required" />
              <Input name="education" value={formData.education} onChange={handleInputChange} placeholder="Education Level" />
              <Input name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Work Experience" />
              <Input name="certifications" value={formData.certifications} onChange={handleInputChange} placeholder="Licenses/Certifications (if any)" />
              <Textarea name="preferredQualifications" value={formData.preferredQualifications} onChange={handleInputChange} placeholder="Preferred Qualifications" />
              <Textarea name="reasonForOpening" value={formData.reasonForOpening} onChange={handleInputChange} placeholder="Reason for Opening (e.g., Resignation, Expansion)" />
              <Input name="urgency" value={formData.urgency} onChange={handleInputChange} placeholder="Urgency of Hiring (e.g., Immediate)" />
            </div>
            <Button className="mt-6 w-full" onClick={handleSubmit}>
              Submit Request
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeadHeader;