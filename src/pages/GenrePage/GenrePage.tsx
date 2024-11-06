import { Link, useParams } from "react-router-dom";
import { MoviesGrid } from "../../components/MoviesGrid";
import { useGetMoviesByGenreQuery } from "../../app/moviesApi";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./GenrePage.module.scss";
import { Skeleton } from "antd";

const GenrePage = () => {
  const { name } = useParams();

  const { data, isError, isLoading, isSuccess } =
    useGetMoviesByGenreQuery(name);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (isSuccess && !data) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.container}>
      <Link to="/genres">
        <LeftOutlined />
        <span className={styles.title}>{name}</span>
      </Link>
      {/* TODO: либо добавить картинки, либо сделать нормальный список */}
      <MoviesGrid movies={data} />
    </div>
  );
};

export { GenrePage };
