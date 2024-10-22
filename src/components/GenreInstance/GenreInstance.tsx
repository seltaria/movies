import { FC } from "react";
import styles from "./GenreInstance.module.scss";
import { Link } from "react-router-dom";

interface GenreProps {
  imageUrl: string;
  title: string;
}

const GenreInstance: FC<GenreProps> = ({ imageUrl, title }) => {
  return (
    <Link to={`${title}`} className={styles.container}>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div>{title}</div>
    </Link>
  );
};

export { GenreInstance };
