import { SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/zustand/store/store.provider";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { CreateJob } from "@/config/admin";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobData, setJobData] = useState({
    position: "",
    department: "",
    status: "",
    requirements: "",
    type: "",
  });

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJobData({
      position: "",
      department: "",
      status: "",
      requirements: "",
      type: "",
    }); // Reset the form fields when closing the modal
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add the handleSubmit function here
  const handleSubmit = async () => {
    try {
      console.log("Submitting job data:", jobData); // Debugging log
      const response = await CreateJob(jobData); // Call the CreateJob function
      toast.success(response.message || "Job created successfully.");
      handleCloseModal(); // Close the modal after successful submission
    } catch (error: any) {
      console.error("Error creating job:", error);
      toast.error(error.message || "An error occurred while creating the job.");
    }
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white px-6 py-3 shadow">
        {/* Left: Brand + Nav */}
        <div className="flex items-center space-x-8">
          {/* Brand */}
          <div className="text-xl font-bold text-gray-800 tracking-wide">
            <img src="/logo.png" className="w-16" alt="Logo" />
          </div>

          {/* Navigation Menu */}
          <nav className="flex space-x-4">
            <Link
              to="/Admin/Dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/Admin/Jobs"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Jobs
            </Link>
            <Link
              to="/Admin/Reports"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Reports
            </Link>
          </nav>
        </div>

        {/* Right: Settings, Add New, Logout, Avatar */}
        <div className="flex items-center space-x-4">
          <Button className="bg-[#e65a96] hover:bg-[#d14a86] text-white" onClick={handleAddNew}>
            Add New Job
          </Button>
          <Button className="bg-[#e65a96] hover:bg-[#d14a86] text-white" onClick={handleLogout}>
            Logout
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Job</h2>
            <div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Position</label>
    <input
      type="text"
      name="position"
      value={jobData.position}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded mt-1"
      placeholder="Enter Position"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Department</label>
    <input
      type="text"
      name="department"
      value={jobData.department}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded mt-1"
      placeholder="Enter Department"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Status</label>
    <input
      type="text"
      name="status"
      value={jobData.status}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded mt-1"
      placeholder="Enter Status"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Type</label>
    <input
      type="text"
      name="type"
      value={jobData.type}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded mt-1"
      placeholder="Enter Job Type"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Requirements</label>
    <textarea
      name="requirements"
      value={jobData.requirements}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded mt-1"
      placeholder="Enter Requirements"
      rows={3}
      required
    />
  </div>
</div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button className="bg-[#e65a96] hover:bg-[#d14a86] text-white" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button className="bg-[#e65a96] hover:bg-[#d14a86] text-white" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;