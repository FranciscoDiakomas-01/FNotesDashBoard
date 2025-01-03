import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './pages/dashboard/index.jsx';
import Users from './pages/users/index.jsx';
import Category from './pages/catetory/index.jsx';
import Posts from './pages/posts/index.jsx';
import 'react-toastify/ReactToastify.css'
import Login from './pages/login/index.jsx';
import Profile from './pages/profile/index.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
