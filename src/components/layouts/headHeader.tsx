import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { logoutUser } from "@/zustand/store/store.provider";
import { Link } from 'react-router-dom';


const HeadHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    positionType: "",             // Dropdown: Replacement, New, Full-time, Part-time, Substitute
    jobTitle: "",
    department: "",
    position: "",
    dateNeeded: "",
    semester: "",
    jobDescription: "",           // Duties and Responsibilities
    ksa: "",                      // Knowledge, Skills, Abilities, Competencies, etc.
    requestedBy: "",
    requestDate: "",
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
          <Link to="/" className="text-xl font-bold text-gray-800 tracking-wide">
  <img src="/logo.png" className="w-16" alt="Logo" />
</Link>
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
      <h2 className="text-2xl font-bold mb-4 text-center">Employment Requisition Form</h2>
      <div className="grid grid-cols-2 gap-4">
      <select
  name="positionType"
  value={formData.positionType}
  onChange={handleInputChange}
  className="border p-2 rounded w-full"
>
      <option value="">Select Position Type</option>
      <option value="Replacement">Replacement</option>
        <option value="New">New</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Substitute">Substitute</option>
        </select>
        <Input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Job Title" />
        <Input name="department" value={formData.department} onChange={handleInputChange} placeholder="Department/Program/Unit" />
        <Input name="position" value={formData.position} onChange={handleInputChange} placeholder="Position" />
        <Input name="dateNeeded" value={formData.dateNeeded} onChange={handleInputChange} placeholder="Date Needed" />
        <Input name="semester" value={formData.semester} onChange={handleInputChange} placeholder="Semester/Academic Year" />
        <Textarea name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} placeholder="Primary Duties and Responsibilities" className="col-span-2" />
        <Textarea name="ksa" value={formData.ksa} onChange={handleInputChange} placeholder="Knowledge, Skills, Abilities, Competencies, Education, and Experience Required" className="col-span-2" />
        <Input name="requestedBy" value={formData.requestedBy} onChange={handleInputChange} placeholder="Requested by (Printed Name & Signature)" />
        <Input name="requestDate" value={formData.requestDate} onChange={handleInputChange} placeholder="Request Date" />

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