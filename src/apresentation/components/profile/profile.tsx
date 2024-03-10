import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  function handleSair() {
    localStorage.removeItem("@auth");
    navigate("/sign-in", { replace: true });
  }

  return (
    <div>
      <Button variant="destructive" className="flex gap-2" onClick={handleSair}>
        <LogOut className="w-4 h-4" />
        Sair
      </Button>
    </div>
  );
}
