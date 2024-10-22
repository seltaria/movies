import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main";
import { Layout } from "../pages/Layout/Layout";
import { Genres } from "../pages/Genres";
import { MoviePage } from "../pages/MoviePage";
import { GenrePage } from "../pages/GenrePage";
import { Profile } from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      {
        path: ":id",
        element: <MoviePage />,
      },
      {
        path: "genres",
        element: <Genres />,
      },
      {
        path: "genres/:name",
        element: <GenrePage />,
      },
      {
        element: <PrivateRoute />,
        children: [{ path: "profile", element: <Profile /> }],
      },
    ],
  },
]);
