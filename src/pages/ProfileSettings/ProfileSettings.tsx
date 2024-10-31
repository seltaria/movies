import { FC, ReactNode } from "react";
import styles from "./ProfileSettings.module.scss";
import { Button } from "../../ui/Button";
import { MailOutlined } from "@ant-design/icons";
import { useGetProfileDataQuery, useLogoutMutation } from "../../app/authApi";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

interface InfoBlockProps {
  avatar: ReactNode;
  title: string;
  value: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ avatar, title, value }) => {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.content}>
        <div>{title}</div>
        <div>{value}</div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { data, isLoading, isError, isSuccess } = useGetProfileDataQuery({});
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  if (!data && isSuccess) {
    return <div>Нет данных</div>;
  }

  const { name, surname, email } = data;

  const initials = `${name[0]}${surname[0]}`;

  const handleClick = () => {
    logout({});
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <InfoBlock
        avatar={initials}
        title="Имя Фамилия"
        value={`${name} ${surname}`}
      />
      <InfoBlock
        avatar={<MailOutlined />}
        title="Электронная почта"
        value={email}
      />
      <Button className={styles.button} onClick={handleClick}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export { ProfileSettings };
