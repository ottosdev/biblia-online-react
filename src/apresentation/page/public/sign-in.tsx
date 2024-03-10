import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/apresentation/components/ui/tabs.tsx";
import { Entrar } from "@/apresentation/components/modules/signin/entrar";
import { Cadastre } from "@/apresentation/components/modules/signin/cadastre";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const token = localStorage.getItem("@auth");
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("entrar");

  function handleAtivarAbaEntrar() {
    setAbaAtiva("entrar");
  }

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center w-[400px]">
      <Tabs
        value={abaAtiva}
        onValueChange={setAbaAtiva}
        defaultValue={abaAtiva}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entrar">Entrar</TabsTrigger>
          <TabsTrigger value="cadastre">Cadastre-se</TabsTrigger>
        </TabsList>
        <TabsContent value="entrar">
          <Entrar />
        </TabsContent>
        <TabsContent value="cadastre">
          <Cadastre onSuccess={handleAtivarAbaEntrar} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
