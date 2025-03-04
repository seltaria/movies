import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import styles from "./MainMovieInfo.module.scss";
import { FC, useEffect, useState } from "react";
import { RandomMovieResponse } from "../../types";
import { Link } from "react-router-dom";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "../../app/moviesApi";
import { Rating } from "../../ui/Rating";
import { toCapitalized, toHoursAndMinutes } from "../../utils/helpers";
import { clsx } from "clsx";
import { openAuth } from "../../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { useGetProfileDataQuery } from "../../app/authApi";

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
  const { data: favorites } = useGetFavoritesQuery({});
  const { data: user, isError: isUserError } = useGetProfileDataQuery({});

  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [
    addFavoriteMovie,
    { isLoading: isAddingLoading, isError: isAddingError },
  ] = useAddFavoriteMutation();

  const [
    removeFavoriteMovie,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveFavoriteMutation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isFavorite = favorites?.find((el) => el.id === data?.id);

  const handleClick = () => {
    if (!user || isUserError) {
      dispatch(openAuth());
      return;
    }

    if (isFavorite) {
      removeFavoriteMovie(`${data?.id}`);
    } else {
      addFavoriteMovie(`${data?.id}`);
    }
  };

  return (
    <div>
      {isFetching && <div className={styles.fetching} />}

      <div className={clsx(styles.card, short && styles.short)}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Rating rating={data?.tmdbRating} />
            <div>{data?.releaseYear}</div>
            <div>{toCapitalized(data?.genres?.join(", "))}</div>
            {data?.runtime && <div>{toHoursAndMinutes(data.runtime)}</div>}
          </div>

          <div className={styles.title}>{data?.title}</div>
          <div className={styles.subtitle}>{data?.plot}</div>

          <div className={styles.buttons}>
            {/* TODO: выключать трейлер при закрытии модалки */}
            {data?.trailerUrl && <button onClick={openModal}>Trailer</button>}
            {refresh && data?.id && (
              <Link className={styles.about} to={`${data.id}`}>
                About
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
          src={data?.trailerUrl?.replace("watch?v=", "embed/")}
        />
        <button className={styles.closeButton} onClick={closeModal}>
          <CloseOutlined />
        </button>
        {/* TODO: сделать, чтобы полоска не мешала перематывать */}
        <div className={styles.title}>{data?.title}</div>
      </Modal>
    </div>
  );
};

export { MainMovieInfo };
