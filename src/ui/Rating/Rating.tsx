import styles from "./Rating.module.scss";
import { StarFilled } from "@ant-design/icons";
import { clsx } from "clsx";
import { FC } from "react";

interface RatingProps {
  rating?: number | string;
  small?: boolean;
}

const getRatingColor = (rating: number) => {
  if (rating >= 8.6) {
    return "gold";
  }
  if (rating >= 7.5) {
    return "green";
  }
  if (rating >= 6.3) {
    return "gray";
  }
  return "red";
};

const Rating: FC<RatingProps> = ({ rating, small }) => {
  if (!rating) {
    return null;
  }

  return (
    <div
      className={clsx(styles.rating, { [styles.small]: small }, [
        styles[getRatingColor(Number(rating))],
      ])}
    >
      <StarFilled />
      {Number(rating).toFixed(1)}
    </div>
  );
};

export { Rating };
