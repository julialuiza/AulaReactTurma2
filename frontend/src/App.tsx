import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import ListaProdutos from "./Pages/ListaProdutos";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/produtos",
    element: <ListaProdutos />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
