import { FC, useEffect } from "react";
import { useLazyGetRandomMovieQuery } from "../../app/moviesApi";
import { MainMovieInfo } from "../MainMovieInfo";
import { Skeleton } from "antd";

export const RandomMovie: FC = () => {
  const [getRandomMovie, { data, isLoading, isFetching, isError, isSuccess }] =
    useLazyGetRandomMovieQuery({});

  useEffect(() => {
    getRandomMovie({}, true);
  }, []);

  const refresh = () => {
    getRandomMovie({}, false);
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  if (!data && isSuccess) {
    return <div>Нет данных</div>;
  }

  return (
    <MainMovieInfo
      data={data}
      isFetching={isFetching}
      refresh={refresh}
      short
    />
  );
};