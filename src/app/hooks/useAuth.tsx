import {
  useContext,
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { useLazyGetProfileDataQuery } from "../authApi";

interface UserProps {
  user: { name: string; surname: string; email: string; favorites: string[] };
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  refetch: () => void;
}
// TODO: перенести в rtk
const AuthContext = createContext<Partial<UserProps>>({});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log(
    "%c user from use auth",
    "background: #222; color: #bada55",
    user
  );

  const [getData, { data, isError, isLoading, isSuccess }] =
    useLazyGetProfileDataQuery();

  const refetch = () => {
    getData({}, false);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    console.log("eff");
    if (isSuccess) {
      setUser(data);
    }
  }, [data, isSuccess]);

  return (
    <AuthContext.Provider
      value={{ user, isError, isLoading, isSuccess, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
