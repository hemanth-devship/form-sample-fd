import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./pages/register";
import Todos from "./pages/Todos";
import { Login } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/todos",
    element: <Todos />
  },
  {
    path: "/login",
    element: <Login />
  }
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
