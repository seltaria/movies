import { Button as AntButton } from "antd";
import Form, { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import { FC, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../app/authApi";
import styles from "./AuthModal.module.scss";
import { Button } from "../../ui/Button";

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

  const goToLogin = () => setRegistered(true);
  const goToRegister = () => setRegistered(false);

  const login = () => {
    const { email, password } = form.getFieldsValue();
    loginUser({ email, password });
    closeModal();

    form.resetFields();
  };

  const register = () => {
    const { email, name, password, surname } = form.getFieldsValue();
    registerUser({ email, name, password, surname });
  };

  return (
    <Form form={form} scrollToFirstError>
      {registered && (
        <div className={styles.container}>
          <div className={styles.subtitle}>Вход</div>
          <FormItem
            name="email"
            rules={[{ type: "email", message: "Введите корректный email" }]}
          >
            <Input placeholder="Электронная почта" />
          </FormItem>
          <FormItem name="password">
            <Input.Password placeholder="Пароль" />
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
          <FormItem
            name="email"
            rules={[
              {
                type: "email",
                message: "Введите корректный email",
              },
              {
                required: true,
                message: "Введите email",
              },
            ]}
          >
            <Input placeholder="Электронная почта" />
          </FormItem>
          <FormItem
            name="name"
            rules={[
              {
                required: true,
                message: "Введите имя",
              },
            ]}
          >
            <Input placeholder="Имя" />
          </FormItem>
          <FormItem
            name="surname"
            rules={[
              {
                required: true,
                message: "Введите фамилию",
              },
            ]}
          >
            <Input placeholder="Фамилия" />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              {
                required: true,
                message: "Введите пароль",
              },
            ]}
          >
            <Input.Password placeholder="Пароль" />
          </FormItem>
          <FormItem
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Подтвердите пароль",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Введенные пароли не совпадают")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Подтвердите пароль" />
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
