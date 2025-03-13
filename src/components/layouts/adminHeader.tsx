import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/zustand/store/store.provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); 
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow">
      {/* Left: Brand + Nav */}
      <div className="flex items-center space-x-8">
        {/* Brand */}
        <div className="text-xl font-bold text-gray-800 tracking-wide">
          <img
            src="/logo.png"
            className="w-16"
            alt="Logo"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex space-x-4">
          <a
            href="/Admin/Dashboard"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Applications
          </a>
          <a
            href="/Job-list"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Jobs
          </a>

          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Reports
          </a>
        </nav>
      </div>

      {/* Right: Settings, Add New, Logout, Avatar */}
      <div className="flex items-center space-x-4">
        <Button variant="default">Settings</Button>
        <Button variant="default">Add New</Button>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="User Avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AdminHeader;
