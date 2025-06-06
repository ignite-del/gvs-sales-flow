
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/ui/logo";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  Plus
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ activeView, setActiveView, onLogout }: SidebarProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create-quote", label: "New Quote", icon: Plus },
    { id: "create-invoice", label: "New Invoice", icon: FileText },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Logo size="md" variant="full" />
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            className={`w-full justify-start h-11 ${
              activeView === item.id 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Separator className="mx-4" />

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-900">John Doe</p>
          <p className="text-xs text-gray-600">Sales Manager</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start h-10 text-gray-700 hover:bg-red-50 hover:text-red-600"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
