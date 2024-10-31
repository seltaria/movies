import { Input, Skeleton } from "antd";
import styles from "./GlobalSearch.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLazyGetMoviesByTitleQuery } from "../../app/moviesApi";
import { Link } from "react-router-dom";
import { Rating } from "../../ui/Rating";
import { toHoursAndMinutes } from "../../utils/helpers";
import { createPortal } from "react-dom";

const GlobalSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [getResults, { data, isError, isFetching, isLoading, isSuccess }] =
    useLazyGetMoviesByTitleQuery();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value);

  const search = () => {
    setIsDropdownOpen(true);
    getResults(searchText);
  };

  const clearSearch = () => {
    setIsDropdownOpen(false);
    setSearchText("");
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <Input
        value={searchText}
        onChange={handleChange}
        placeholder="Поиск"
        onPressEnter={search}
        allowClear
        onClear={clearSearch}
        onFocus={() => setIsDropdownOpen(true)}
      />
      {isDropdownOpen &&
        (data || isFetching || isError) &&
        createPortal(
          <div className={styles.dropdown}>
            {isError && <div>Ошибка</div>}
            {isFetching && <Skeleton active />}
            {isSuccess &&
              !isFetching &&
              Array.isArray(data) &&
              data.map((item, i) => (
                <Link to={`/${item.id}`} key={i}>
                  <img src={item.posterUrl} />
                  <div className={styles.content}>
                    <div className={styles.info}>
                      <Rating rating={item.tmdbRating} small />
                      <div>{item?.releaseYear}</div>
                      <div>{item?.genres?.join(", ")}</div>
                      {item?.runtime && (
                        <div>{toHoursAndMinutes(item.runtime)}</div>
                      )}
                    </div>
                    <div>{item.title}</div>
                  </div>
                </Link>
              ))}
            {isSuccess &&
              !isFetching &&
              Array.isArray(data) &&
              !data.length && <div>По вашему запросу ничего не найдено</div>}
          </div>,
          document.body
        )}
    </div>
  );
};

export { GlobalSearch };
