import { Skeleton } from "antd";
import { useLazyGetFavoritesQuery } from "../../app/moviesApi";
import { MoviesGrid } from "../MoviesGrid";
import { useEffect } from "react";
import { useAuth } from "../../app/hooks/useAuth";

const FavoriteMovies = () => {
  const [getFavorites, { data, isError, isLoading, isSuccess, isFetching }] =
    useLazyGetFavoritesQuery();

  const user = useAuth();

  console.log(data);

  useEffect(() => {
    console.log("favs");
    getFavorites({}, false);
  }, [user]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  return <MoviesGrid movies={data} favorite />;
};

export { FavoriteMovies };
