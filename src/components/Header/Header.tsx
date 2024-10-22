import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { Link, NavLink } from "react-router-dom";
import { AuthModal } from "../AuthModal";
import { useMemo, useState } from "react";
import { GlobalSearch } from "../GlobalSearch";
import styles from "./Header.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { useAuth } from "../../app/hooks/useAuth";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAuth();

  console.log("AAAAAAAAAAA", useAuth());

  console.log("Header:", user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <Link to="/">CinemaGuide</Link>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/genres">Жанры</NavLink>
      <GlobalSearch />
      {user.user?.name ? (
        <NavLink to="/profile">{user.user.name}</NavLink>
      ) : (
        <button className={styles.loginButton} onClick={openModal}>
          Войти
        </button>
      )}
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
        closable={false}
      >
        <AuthModal closeModal={closeModal} />
        <button onClick={closeModal} className={styles.closeButton}>
          <CloseOutlined />
        </button>
      </Modal>
    </div>
  );
};

export { Header };
