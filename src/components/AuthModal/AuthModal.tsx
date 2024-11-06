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
          <div className={styles.subtitle}>Log In</div>
          <FormItem
            name="email"
            rules={[
              { type: "email", message: "Enter the correct email address" },
            ]}
          >
            <Input placeholder="Email" />
          </FormItem>
          <FormItem name="password">
            <Input.Password placeholder="Password" />
          </FormItem>
          <div className={styles.buttons}>
            <Button onClick={login}>Log In</Button>
            <button className={styles.textButton} onClick={goToRegister}>
              Register
            </button>
          </div>
        </div>
      )}
      {!registered && (
        <div className={styles.container}>
          <div className={styles.subtitle}>Register</div>
          <FormItem
            name="email"
            rules={[
              {
                type: "email",
                message: "Enter the correct email address",
              },
              {
                required: true,
                message: "Enter your email address",
              },
            ]}
          >
            <Input placeholder="Email" />
          </FormItem>
          <FormItem
            name="name"
            rules={[
              {
                required: true,
                message: "Enter your name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </FormItem>
          <FormItem
            name="surname"
            rules={[
              {
                required: true,
                message: "Enter your surname",
              },
            ]}
          >
            <Input placeholder="Surname" />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              {
                required: true,
                message: "Enter your password",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </FormItem>
          <FormItem
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The entered passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </FormItem>
          <div className={styles.buttons}>
            <Button onClick={register}>Create new account</Button>
            <button className={styles.textButton} onClick={goToLogin}>
              I have an account
            </button>
          </div>
        </div>
      )}
    </Form>
  );
};

export { AuthModal };
