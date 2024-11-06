import { Tabs, TabsProps } from "antd";
import { ProfileSettings } from "../ProfileSettings";
import styles from "./Profile.module.scss";
import { FavoriteMovies } from "../../components/FavoriteMovies";

const Profile = () => {
  const items: TabsProps["items"] = [
    {
      key: "Favorite movies",
      label: "Favorite movies",
      children: <FavoriteMovies />,
    },
    {
      key: "Profile settings",
      label: "Profile settings",
      children: <ProfileSettings />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Profile</div>
      <Tabs items={items} className={styles.tabs} />
    </div>
  );
};

export { Profile };
