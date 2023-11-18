// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import ListaProdutos from "../Pages/ListaProdutos";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaProdutos />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
