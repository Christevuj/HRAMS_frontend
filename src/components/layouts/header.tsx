import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useNavigate } from "react-router-dom"
import useStore from "@/zustand/store/store"
import { logoutUser, selector } from "@/zustand/store/store.provider"
import { toast } from "react-hot-toast"

export function Header() {
  const navigate = useNavigate()
  const user = useStore(selector("user"))
  const isAuthenticated = user?.isAuthenticated
  const userInfo = user?.info
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const baseNavLinks = [
    { label: "Home", path: "/" },
    { label: "Jobs", path: "#jobs" },
    { label: "About", path: "#about" },
  ]

 

  const navLinks = baseNavLinks

  const handleLogout = () => {
    logoutUser()
    toast.success("Logged out successfully")
    navigate("/login")
  }

  // Listen for scroll events to update isScrolled
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 0px, set isScrolled to true
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full transition-colors duration-300
        ${isScrolled ? "bg-[#e65b7a] text-white" : "bg-transparent text-[#e65b7a]"}
      `}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">UIC HRAMS Portal</span>
        </div>
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="space-x-4">
            {navLinks.map((item) => (
              <a
                href={item.path}
                key={item.label}
                className="cursor-pointer text-sm font-medium transition-colors hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
          {isAuthenticated ? (
            <>
              <Button
                className={`${
                  "bg-[#e65b7a] text-white"
                }`}
                onClick={() => navigate("/application_form")}
              >
                Apply Now
              </Button>
              <Button
               variant="outline"
               className="text-[#e65b7a] bg-white"
               onClick={() => navigate("/login")}
             >
               Login
              </Button>
              
            </>
          ) : (
            <Button
              variant="outline"
              className={"text-[#e65b7a] bg-white"}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
        <button
          className="inline-flex items-center md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          className={`
            border-b md:hidden transition-colors duration-300
            ${isScrolled ? "bg-[#e65b7a]" : "bg-white"}
          `}
        >
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((item) => (
              <a
                href={item.path}
                key={item.label}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  cursor-pointer text-sm font-medium transition-colors
                  ${isScrolled ? "text-white hover:text-gray-300" : "text-[#e65b7a] hover:text-gray-700"}
                `}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                  <div className="flex justify-center">
                    <Avatar>
                      <AvatarImage
                        src={userInfo?.avatar || "https://github.com/shadcn.png"}
                        alt="User Avatar"
                      />
                      <AvatarFallback>
                        {userInfo?.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/login")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/application_form")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Apply Now
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
