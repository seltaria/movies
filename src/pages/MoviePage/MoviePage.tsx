import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../app/moviesApi";
import { MainMovieInfo } from "../../components/MainMovieInfo";
import styles from "./MoviePage.module.scss";
import { Skeleton } from "antd";

const MoviePage = () => {
  const { id } = useParams();

  const { data, isError, isLoading, isSuccess } = useGetMovieByIdQuery({ id });

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
    <div className={styles.container}>
      <MainMovieInfo data={data} />
      <div>
        <div>О фильме</div>
        {data.language && <div>Язык оригинала - {data.language}</div>}
        {data.budget && <div>Бюджет - {data.budget}</div>}
        {data.revenue && <div>Выручка - {data.revenue}</div>}
        {data.director && <div>Режиссер - {data.director}</div>}
        {data.production && <div>Продакшен - {data.production}</div>}
        {data.awardsSummary && <div>Награды - {data.awardsSummary}</div>}
      </div>
    </div>
  );
};

export { MoviePage };
