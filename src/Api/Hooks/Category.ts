//
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { instance } from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fetchOne = async (data: any): Promise<any> => {
  const response = await instance.get(`Category/${data}`);
  return response.data;
};

const fetchall = async (text: string): Promise<any> => {
  const response = await instance.get(`Category/get-categories?name=${text}`);
  return response.data;
};

const addUpdate = async (payload: any): Promise<any> => {
  const response = await instance.post("Category/add-update-category", payload);
  return response.data;
};

const deleteone = async (payload: any): Promise<any> => {
  const response = await instance.delete(`Category/${payload.id}`);
  return response.data;
};
export const useAddUpdateCategory = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(addUpdate, {
    onSuccess: () => {
      toast.success("Category Updated  successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    },
    onError: (error) => {
      console.error("Error during addUpdate:", error.message);
    },
  });
};

export const useDeleteCategory = (): UseMutationResult<any, Error> => {
  const query = useQueryClient();
  return useMutation(deleteone, {
    onSuccess: () => {
      toast.success("Category Delete  successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      query.invalidateQueries("Categoryes");
    },
    onError: (error) => {
      toast.error("Server Error!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Error during delete:", error.message);
    },
  });
};
export const useCategoryes = (text: string): UseQueryResult<any> => {
  return useQuery(["Categoryes", text], () => fetchall(text), {
    onSuccess: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data?.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error(
        "Error fetching Categoryes : ",
        error?.response?.data?.Message
      );
    },
  });
};
export const useOneCategory = (data: any): UseQueryResult<any> => {
  return useQuery(["oneCategory "], () => fetchOne(data), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};
