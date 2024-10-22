import { FC, ReactNode } from "react";
import styles from "./ProfileSettings.module.scss";
import { Button } from "../../ui/Button";
import { MailOutlined } from "@ant-design/icons";
import { useLazyLogoutQuery } from "../../app/authApi";
import { useAuth } from "../../app/hooks/useAuth";
import { Skeleton } from "antd";

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
  const user = useAuth();
  const [logout] = useLazyLogoutQuery();

  if (user.isLoading) {
    return <Skeleton />;
  }

  if (user.isError) {
    return <div>Ошибка</div>;
  }

  if (!user.user) {
    return <div>Нет данных</div>;
  }

  const { name, surname, email } = user.user;

  const initials = `${name[0]}${surname[0]}`;

  const handleClick = () => {
    logout({});

    user.refetch();
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
