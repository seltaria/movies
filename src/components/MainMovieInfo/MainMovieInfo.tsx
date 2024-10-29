import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  RedoOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Modal, Spin } from "antd";
import styles from "./MainMovieInfo.module.scss";
import { FC, useEffect, useMemo, useState } from "react";
import { RandomMovieResponse } from "../../types";
import { Link } from "react-router-dom";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "../../app/moviesApi";
import { Rating } from "../../ui/Rating";
import { toHoursAndMinutes } from "../../utils/helpers";
import { useAuth } from "../../app/hooks/useAuth";
import { clsx } from "clsx";
import { openAuth } from "../../app/slices/userSlice";
import { useAppDispatch } from "../../app/hooks/hooks";

interface MainMovieInfoProps {
  data: RandomMovieResponse;
  isFetching: boolean;
  refresh: () => void;
  short?: boolean;
}

const MainMovieInfo: FC<Partial<MainMovieInfoProps>> = ({
  data,
  isFetching,
  refresh,
  short,
}) => {
  const user = useAuth();
  const dispatch = useAppDispatch();

  console.log("main movie user info", user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    user.user?.favorites?.includes(`${data?.id}`)
  );

  useEffect(() => {
    console.log("USER CHANGED in main movie info", user.user);
    setIsFavorite(user.user?.favorites?.includes(`${data?.id}`));
  }, [user]);

  const [
    addFavoriteMovie,
    { isLoading: isAddingLoading, isError: isAddingError },
  ] = useAddFavoriteMutation();

  const [removeFavoriteMovie] = useRemoveFavoriteMutation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = () => {
    if (!user.user) {
      dispatch(openAuth());
    }
    console.log({ isFavorite });
    if (isFavorite) {
      removeFavoriteMovie(`${data?.id}`);
    } else {
      addFavoriteMovie(`${data?.id}`);
    }
    user.refetch();
  };

  return (
    <div>
      {isFetching && <div className={styles.fetching} />}

      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Rating rating={data?.tmdbRating} />
            <div>{data?.releaseYear}</div>
            <div>{data?.genres?.join(", ")}</div>
            {data?.runtime && <div>{toHoursAndMinutes(data.runtime)}</div>}
          </div>

          <div className={styles.title}>{data?.title}</div>
          <div className={clsx(styles.subtitle, short && styles.short)}>
            {data?.plot}
          </div>

          <div className={styles.buttons}>
            <button onClick={openModal}>Трейлер</button>
            {refresh && data?.id && (
              <Link className={styles.about} to={`${data.id}`}>
                О фильме
              </Link>
            )}
            <button onClick={handleClick} disabled={isAddingLoading}>
              {isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </button>
            {refresh && (
              <button onClick={refresh}>
                <RedoOutlined />
              </button>
            )}
          </div>
        </div>
        <img className={styles.poster} src={data?.posterUrl} />
      </div>

      <Modal
        className={styles.modal}
        open={isModalOpen}
        closable={false}
        footer={false}
      >
        <iframe
          className={styles.trailer}
          src={data?.trailerUrl.replace("watch?v=", "embed/")}
        />
        <button className={styles.closeButton} onClick={closeModal}>
          <CloseOutlined />
        </button>
        <div className={styles.title}>{data?.title}</div>
      </Modal>
    </div>
  );
};

export { MainMovieInfo };
