import { FC } from "react";
import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";
import { useRemoveFavoriteMutation } from "../../app/moviesApi";
import { CloseOutlined } from "@ant-design/icons";
import { useAuth } from "../../app/hooks/useAuth";

interface MovieCardProps {
  id: number | string;
  title: string;
  imageUrl?: string;
  number?: number;
  favorite?: boolean;
}

const MovieCard: FC<MovieCardProps> = ({
  imageUrl,
  title,
  id,
  number,
  favorite,
}) => {
  const [remove] = useRemoveFavoriteMutation();

  const user = useAuth();

  const removeFavorite = () => {
    remove(`${id}`);
    user.refetch();
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`/${id}`} className={styles.container}>
        {number && <div className={styles.number}>{number}</div>}
        {imageUrl && <img src={imageUrl} alt={title} />}
        <div className={styles.title}>{title}</div>
      </Link>
      {favorite && (
        <button className={styles.deleteButton} onClick={removeFavorite}>
          <CloseOutlined />
        </button>
      )}
    </div>
  );
};

export { MovieCard };
