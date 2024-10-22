import { Button as AntButton } from "antd";
import Form, { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import { FC, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../app/authApi";
import styles from "./AuthModal.module.scss";
import { Button } from "../../ui/Button";
import { MailOutlined } from "@ant-design/icons";
import { useAuth } from "../../app/hooks/useAuth";

interface AuthModalProps {
  closeModal: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ closeModal }) => {
  const [registered, setRegistered] = useState(true);
  const [
    loginUser,
    {
      isLoading: isLoginLoading,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
    },
  ] = useLoginMutation();
  const [
    registerUser,
    {
      isLoading: isRegisterLoading,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterMutation();

  const [form] = useForm();

  const user = useAuth();

  const goToLogin = () => setRegistered(true);
  const goToRegister = () => setRegistered(false);

  const login = () => {
    const { email, password } = form.getFieldsValue();
    loginUser({ email, password });

    user.refetch();
    closeModal();
  };

  const register = () => {
    const { email, name, password, surname } = form.getFieldsValue();
    registerUser({ email, name, password, surname });
  };

  return (
    <Form form={form}>
      <div className={styles.logo}>CinemaGuide</div>
      {registered && (
        <div className={styles.container}>
          <FormItem name="email">
            <Input placeholder="Электронная почта" />
          </FormItem>
          <FormItem name="password">
            <Input placeholder="Пароль" />
          </FormItem>
          <div className={styles.buttons}>
            <Button onClick={login}>Войти</Button>
            <button className={styles.textButton} onClick={goToRegister}>
              Регистрация
            </button>
          </div>
        </div>
      )}
      {!registered && (
        <div className={styles.container}>
          <div className={styles.subtitle}>Регистрация</div>
          <FormItem name="email">
            <Input placeholder="Электронная почта" />
          </FormItem>
          <FormItem name="name">
            <Input placeholder="Имя" />
          </FormItem>
          <FormItem name="surname">
            <Input placeholder="Фамилия" />
          </FormItem>
          <FormItem name="password">
            <Input placeholder="Пароль" />
          </FormItem>
          {/* TODO: проверка совпадения паролей */}
          <FormItem name="pass">
            <Input placeholder="Подтвердите пароль" />
          </FormItem>
          <div className={styles.buttons}>
            <Button onClick={register}>Создать аккаунт</Button>
            <button className={styles.textButton} onClick={goToLogin}>
              У меня есть аккаунт
            </button>
          </div>
        </div>
      )}
    </Form>
  );
};

export { AuthModal };
