import { Skeleton } from "antd";
import { useGetGenresQuery } from "../../app/moviesApi";
import { GenreInstance } from "../../components/GenreInstance";
import styles from "./Genres.module.scss";

const Genres = () => {
  const { data, isError, isLoading, isSuccess } = useGetGenresQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Skeleton active />;
  }

  const sortedData = data.toSorted();

  return (
    <div className={styles.container}>
      {sortedData.map((item, index) => (
        <GenreInstance key={index} imageUrl="" title={item} />
      ))}
    </div>
  );
};

export { Genres };
