import { createHashRouter } from "react-router-dom";
import { Main } from "../pages/Main";
import { Layout } from "../pages/Layout/Layout";
import { Genres } from "../pages/Genres";
import { MoviePage } from "../pages/MoviePage";
import { GenrePage } from "../pages/GenrePage";
import { Profile } from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";
import { Error } from "../pages/Error";

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Main />, errorElement: <Error /> },
      {
        path: ":id",
        element: <MoviePage />,
        errorElement: <Error />,
      },
      {
        path: "genres",
        element: <Genres />,
        errorElement: <Error />,
      },
      {
        path: "genres/:name",
        element: <GenrePage />,
        errorElement: <Error />,
      },
      {
        element: <PrivateRoute />,
        children: [{ path: "profile", element: <Profile /> }],
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);
