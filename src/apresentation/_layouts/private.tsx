import { Outlet } from "react-router-dom";
import { Header } from "@/apresentation/components/modules/header/header";

export default function Private() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
        <Outlet />
      </div>
    </div>
  );
}
