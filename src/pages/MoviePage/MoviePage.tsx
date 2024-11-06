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
    return <div>Error</div>;
  }

  if (!data && isSuccess) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.container}>
      <MainMovieInfo data={data} />
      <div>
        <div>About</div>
        {data.language && <div>Original language - {data.language}</div>}
        {data.budget && <div>Budget - {data.budget}</div>}
        {data.revenue && <div>Revenue - {data.revenue}</div>}
        {data.director && <div>Director - {data.director}</div>}
        {data.production && <div>Production - {data.production}</div>}
        {data.awardsSummary && <div>Awards - {data.awardsSummary}</div>}
      </div>
    </div>
  );
};

export { MoviePage };
