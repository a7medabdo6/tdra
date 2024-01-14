//
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { instance } from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fetchOne = async (data: any): Promise<any> => {
  const response = await instance.get(`Entity/${data?.id}-with-fields`);
  return response.data;
};
const fetchOneWithMapping = async (data: any): Promise<any> => {
  const response = await instance.get(`Entity/${data?.id}-with-mappings`);
  return response.data;
};

const fetchall = async (): Promise<any> => {
  const response = await instance.get(`Entity/get-entities`);
  return response.data;
};

const addUpdate = async (payload: any): Promise<any> => {
  const response = await instance.post("Entity/add-update-entity", payload);
  return response.data;
};
const addUpdatefieldMapping = async (payload: any): Promise<any> => {
  const response = await instance.post(
    "EntityFieldMapping/add-list-entity-field-mapping",
    payload
  );
  return response.data;
};

const deleteone = async (payload: any): Promise<any> => {
  const response = await instance.delete(`Entity/${payload.id}`);
  return response.data;
};
export const useAddUpdateEntity = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(addUpdate, {
    onSuccess: () => {
      toast.success("Entity Updated  successfully!", {
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

export const useAddUpdateFieldMappingEntity = (): UseMutationResult<
  any,
  Error
> => {
  const navigate = useNavigate();
  return useMutation(addUpdatefieldMapping, {
    onSuccess: () => {
      toast.success("Entity Mapping Updated  successfully!", {
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

export const useDeleteEntity = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(deleteone, {
    onSuccess: () => {
      toast.success("Entity Delete  successfully!", {
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
export const useEntities = (): UseQueryResult<any> => {
  return useQuery(["entities "], () => fetchall(), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching Entities : ", error.message);
    },
  });
};
export const useOneEntity = (data: any): UseQueryResult<any> => {
  return useQuery(["one "], () => fetchOne(data), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};
export const useOneEntityWithMapping = (data: any): UseQueryResult<any> => {
  return useQuery(["onewithMapping "], () => fetchOneWithMapping(data), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};