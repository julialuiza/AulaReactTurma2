import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import ListaProdutos from "./Pages/ListaProdutos";
import NavBarLayout from "./Layout/NavbarLayout";

const router = createBrowserRouter([
  {
    element: <NavBarLayout />,
    children: [
      {
        path: "/produtos",
        element: <ListaProdutos />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
