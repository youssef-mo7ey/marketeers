import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          {" "}
          <ProtectedRoute element={<Home />} />
        </MainLayout>
      ),
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
