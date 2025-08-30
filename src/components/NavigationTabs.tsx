import { Home, Video, Upload, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Feed", href: "/", icon: Home },
  { name: "My Swings", href: "/swings", icon: Video },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Profile", href: "/profile", icon: User },
];

export function NavigationTabs() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.href}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200",
                "text-muted-foreground hover:text-primary hover:bg-accent",
                isActive && "text-primary bg-golf-light/20 shadow-golf"
              )
            }
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}