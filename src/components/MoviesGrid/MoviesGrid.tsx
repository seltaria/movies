import { FC } from "react";
import { MovieCard } from "../MovieCard";
import { RandomMovieResponse } from "../../types";
import styles from "./MoviesGrid.module.scss";

interface MoviesGridProps {
  movies?: RandomMovieResponse[];
  showNumbers?: boolean;
  favorite?: boolean;
}

export const MoviesGrid: FC<MoviesGridProps> = ({
  movies,
  showNumbers,
  favorite,
}) => {
  if (!Array.isArray(movies)) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      {movies.map((item, i) => (
        <MovieCard
          key={i}
          title={item.title}
          imageUrl={item.posterUrl}
          id={item.id}
          number={showNumbers && i + 1}
          favorite={favorite}
        />
      ))}
    </div>
  );
};
