// components/ui/dropdown-menu.tsx
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

type DropdownMenuItem = {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
};

// DropdownMenuTrigger component
export const DropdownMenuTrigger = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
  <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClick}>
    {children}
  </button>
);

// DropdownMenuContent component
export const DropdownMenuContent = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
    <ul>{children}</ul>
  </div>
);

// DropdownMenuItem component
export const DropdownMenuItem = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <li
    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
    onClick={onClick}
  >
    {children}
  </li>
);

// Main DropdownMenu component
export const DropdownMenu = ({ children, menuItems }: { children: React.ReactNode; menuItems: DropdownMenuItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <DropdownMenuTrigger onClick={toggleMenu}>
        {children}
      </DropdownMenuTrigger>
      {isOpen && (
        <DropdownMenuContent>
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </div>
  );
};
