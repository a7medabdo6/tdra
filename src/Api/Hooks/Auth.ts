// useUser.ts
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { instance } from "../axios";

interface User {
  id: number;
  name: string;
}
interface LoginPayload {
  email: string;
  password: string;
}
//

const fetchUser = async (userId: number): Promise<User> => {
  const response = await instance.get(`/api/users/${userId}`);
  return response.data;
};

const login = async (payload: LoginPayload): Promise<any> => {
  const response = await instance.post("User/login", payload);
  return response.data;
};

export const useLogin = (): UseMutationResult<any, Error, LoginPayload> => {
  return useMutation(login, {
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Error during login:", error.message);
    },
  });
};

export const useUser = (userId: number): UseQueryResult<User> => {
  return useQuery(["user", userId], () => fetchUser(userId), {
    onSuccess: (data: User) => {
      console.log("User data fetched successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error fetching user:", error.message);
    },
  });
};
