import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { instance } from "../axios";
import { toast } from "react-toastify";

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
      toast.success("User logged successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("token", data?.token);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.replace("/");
    },
    onError: (error) => {
      console.error("Error during login:", error.message);
    },
  });
};

export const useUser = (userId: number): UseQueryResult<User> => {
  return useQuery(["user", userId], () => fetchUser(userId), {
    onSuccess: () => {
      // console.log("User data fetched successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error fetching user:", error.message);
    },
  });
};
