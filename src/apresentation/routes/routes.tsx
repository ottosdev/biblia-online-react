import Private from "@/apresentation/_layouts/private.tsx";
import Public from "@/apresentation/_layouts/public.tsx";
import Dashboard from "@/apresentation/page/private/dashboard.tsx";
import SignIn from "@/apresentation/page/public/sign-in.tsx";
import { createBrowserRouter } from "react-router-dom";
import { Livros } from "@/apresentation/page/private/livros.tsx";

import LerLivros from "../components/modules/leitura/livros/ler-livros";
import LerCapitulo from "../components/modules/leitura/capitulo";
import Versiculo from "../components/modules/cadastro/versiculos/versiculo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Private />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "cadastro/livros", element: <Livros /> },
      { path: "cadastro/versiculos", element: <Versiculo /> },
      { path: "livros", element: <LerLivros /> },
      { path: "livros/:nome/:livroId/:capituloId", element: <LerCapitulo /> },
    ],
  },
  {
    path: "/",
    element: <Public />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
