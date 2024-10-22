import { Skeleton } from "antd";
import { useGetTop10MoviesQuery } from "../../app/moviesApi";
import { MoviesGrid } from "../../components/MoviesGrid";
import { RandomMovie } from "../../components/RandomMovie";
import styles from "./Main.module.scss";

export const Main = () => {
  const { data, isError, isLoading, isSuccess } = useGetTop10MoviesQuery({});

  return (
    <div className={styles.container}>
      <RandomMovie />
      {isLoading && <Skeleton active />}
      {isSuccess && (
        <>
          <div className={styles.topTitle}>Топ 10 фильмов</div>
          <MoviesGrid movies={data} showNumbers />
        </>
      )}
    </div>
  );
};
