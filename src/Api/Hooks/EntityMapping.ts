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
  const response = await instance.get(`EntityMapping/${data?.id}`);
  return response.data;
};

const fetchall = async (): Promise<any> => {
  const response = await instance.get(`EntityMapping/get-entities`);
  return response.data;
};

const addUpdate = async (payload: any): Promise<any> => {
  const response = await instance.post(
    "EntityMapping/add-update-EntityMapping",
    payload
  );
  return response.data;
};

const PostMapping = async (payload: any): Promise<any> => {
  const response = await instance.post(
    "EntityField/add-entity-fields-with-mapping",
    payload
  );
  return response.data;
};
const PostEditAddENT = async (payload: any): Promise<any> => {
  const response = await instance.post(
    "Entity/add-update-entity-with-fields",
    payload
  );
  return response.data;
};

const deleteone = async (payload: any): Promise<any> => {
  const response = await instance.delete(`EntityMapping/${payload.id}`);
  return response.data;
};
export const useAddUpdateEntityMapping = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(addUpdate, {
    onSuccess: () => {
      toast.success("EntityMapping Updated  successfully!", {
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
export const usePostMapping = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(PostMapping, {
    onSuccess: () => {
      toast.success("EntityMapping Updated  successfully!", {
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
    onError: () => {
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
    },
  });
};
export const useAddEditEntity = (): UseMutationResult<any, Error> => {
  // const navigate = useNavigate();
  return useMutation(PostEditAddENT, {
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
      // setTimeout(() => {
      //   navigate(-1);
      // }, 1000);
    },
    onError: () => {
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
    },
  });
};

export const useDeleteEntityMapping = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(deleteone, {
    onSuccess: () => {
      toast.success("EntityMapping Delete  successfully!", {
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
  return useQuery(["EntityMapping "], () => fetchall(), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching Entities : ", error.message);
    },
  });
};
export const useOneEntityMapping = (data: any): UseQueryResult<any> => {
  return useQuery(["oneEntityMapping "], () => fetchOne(data), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};
