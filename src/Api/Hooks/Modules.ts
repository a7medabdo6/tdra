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
  const response = await instance.get(`Module/${data?.id}`);
  return response.data;
};

const fetchall = async (): Promise<any> => {
  const response = await instance.get(`Module/get-modules`);
  return response.data;
};

const addUpdate = async (payload: any): Promise<any> => {
  const response = await instance.post("Module/add-update-module", payload);
  return response.data;
};

const deleteone = async (payload: any): Promise<any> => {
  const response = await instance.delete(`Module/${payload.id}`);
  return response.data;
};
export const useAddUpdateModule = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(addUpdate, {
    onSuccess: () => {
      toast.success("Module Updated  successfully!", {
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

export const useDeleteModule = (): UseMutationResult<any, Error> => {
  const query = useQueryClient();
  return useMutation(deleteone, {
    onSuccess: () => {
      toast.success("Module Delete  successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      query.invalidateQueries("Modulees");
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
export const useModulees = (): UseQueryResult<any> => {
  return useQuery(["Modulees"], () => fetchall(), {
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
        "Error fetching Modulees : ",
        error?.response?.data?.Message
      );
    },
  });
};
export const useOneModule = (data: any): UseQueryResult<any> => {
  return useQuery(["oneModule "], () => fetchOne(data), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};
