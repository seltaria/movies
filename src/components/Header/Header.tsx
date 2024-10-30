import Modal from "antd/es/modal/Modal";
import { Link, NavLink } from "react-router-dom";
import { AuthModal } from "../AuthModal";
import { GlobalSearch } from "../GlobalSearch";
import styles from "./Header.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { closeAuth, openAuth } from "../../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { useGetProfileDataQuery } from "../../app/authApi";

const Header = () => {
  const dispatch = useAppDispatch();

  const { data } = useGetProfileDataQuery({});

  const isModalOpen = useAppSelector((store) => store.user.isAuthOpen);

  const openModal = () => dispatch(openAuth());
  const closeModal = () => dispatch(closeAuth());

  return (
    <div className={styles.container}>
      <Link to="/">CinemaGuide</Link>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/genres">Жанры</NavLink>
      <GlobalSearch />
      {data?.name ? (
        <NavLink to="/profile">{data.name}</NavLink>
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
