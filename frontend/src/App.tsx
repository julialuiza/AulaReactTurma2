import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import ListaProdutos from "./Pages/ListaProdutos";
import NavBarLayout from "./Layout/NavbarLayout";
import Cart from "./Pages/Carrinho";

const router = createBrowserRouter([
  {
    element: <NavBarLayout />,
    children: [
      {
        path: "/",
        element: <ListaProdutos />,
      },
      {
        path: "/carrinho",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
