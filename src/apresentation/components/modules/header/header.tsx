import { ModeToggle } from "@/apresentation/components/mode-toggle.tsx";
import { Separator } from "@/apresentation/components/ui/separator.tsx";
import { NavMenu } from "@/apresentation/components/modules/header/nav-menu";
import { BookIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Profile from "../../profile/profile";
export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <BookIcon className="h-5 w-5" />
          <span className="text-sm ">Biblia online</span>
        </Link>

        <Separator orientation="vertical" className="h-6" />
        <Link to="/" className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5" />
          <span className="text-sm ">Inicio</span>
        </Link>
        <NavMenu />

        <Separator orientation="vertical" className="h-6" />
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </div>
  );
}
