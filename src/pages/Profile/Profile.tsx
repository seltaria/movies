import { Tabs, TabsProps } from "antd";
import { ProfileSettings } from "../ProfileSettings";
import styles from "./Profile.module.scss";
import { FavoriteMovies } from "../../components/FavoriteMovies";

const Profile = () => {
  const items: TabsProps["items"] = [
    {
      key: "Избранные фильмы",
      label: "Избранные фильмы",
      children: <FavoriteMovies />,
    },
    {
      key: "Настройка аккаунта",
      label: "Настройка аккаунта",
      children: <ProfileSettings />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Мой аккаунт</div>
      <Tabs items={items} className={styles.tabs} />
    </div>
  );
};

export { Profile };
