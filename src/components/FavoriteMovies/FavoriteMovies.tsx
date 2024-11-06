import { Skeleton } from "antd";
import { useLazyGetFavoritesQuery } from "../../app/moviesApi";
import { MoviesGrid } from "../MoviesGrid";
import { useEffect } from "react";

const FavoriteMovies = () => {
  const [getFavorites, { data, isError, isLoading, isSuccess, isFetching }] =
    useLazyGetFavoritesQuery();

  useEffect(() => {
    console.log(data);
    getFavorites({}, false);
  }, []);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <MoviesGrid movies={data} favorite />;
};

export { FavoriteMovies };
