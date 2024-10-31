import Modal from "antd/es/modal/Modal";
import { Link, NavLink } from "react-router-dom";
import { AuthModal } from "../AuthModal";
import { GlobalSearch } from "../GlobalSearch";
import styles from "./Header.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { closeAuth, openAuth } from "../../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { useGetProfileDataQuery } from "../../app/authApi";
import { Skeleton } from "antd";

const Header = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetProfileDataQuery({});

  const isModalOpen = useAppSelector((store) => store.user.isAuthOpen);

  const openModal = () => dispatch(openAuth());
  const closeModal = () => dispatch(closeAuth());

  return (
    <div className={styles.container}>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/genres">Жанры</NavLink>
      <GlobalSearch />
      {isLoading && <Skeleton.Avatar active />}
      {!isLoading && data?.name && !isError && (
        <NavLink to="/profile">{data.name}</NavLink>
      )}
      {!isLoading && (!data?.name || isError) && (
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
