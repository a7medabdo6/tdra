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
  const response = await instance.get(`Entity/${data?.id}`);
  return response.data;
};
const EntityFieldMappingsByEntityId = async (data: any): Promise<any> => {
  const response = await instance.get(
    `EntityFieldMapping/get-entity-field-mappings-by-entity-id-${data?.id}`
  );
  return response.data;
};
const fetchOneConnectionTo = async (data: any): Promise<any> => {
  const response = await instance.get(`Connection/to-entity-${data?.id}`);
  return response.data;
};

const fetchOneWithMapping = async (data: any): Promise<any> => {
  const response = await instance.get(`Entity/${data?.id}-with-mappings`);
  return response.data;
};

const fetchall = async (text: string): Promise<any> => {
  const response = await instance.get(`Entity/get-entities?name=${text}`);
  return response.data;
};
const fetchEntityFieldGetfields = async (): Promise<any> => {
  const response = await instance.get(`EntityField/get-all-fields`);
  return response.data;
};
const addUpdate = async (payload: any): Promise<any> => {
  const response = await instance.post("Entity/add-update-entity", payload);
  return response.data;
};

const PostMock = async (payload: any): Promise<any> => {
  const response = await instance.post("Connection/submit", payload);
  return response.data;
};

const addUpdatefieldMapping = async (payload: any): Promise<any> => {
  const response = await instance.post(
    "EntityFieldMapping/add-list-entity-field-mapping",
    payload
  );
  return response.data;
};
const addUpdateListEntityFieldMapping = async (payload: any): Promise<any> => {
  const response = await instance.post(
    "EntityFieldMapping/add-update-list-entity-field-mapping",
    payload
  );
  return response.data;
};

const deleteone = async (payload: any): Promise<any> => {
  const response = await instance.delete(`Entity/${payload.id}`);
  return response.data;
};
export const useAddUpdateEntity = (): UseMutationResult<any, Error> => {
  // const navigate = useNavigate();
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
      // setTimeout(() => {
      //   navigate(-1);
      // }, 1000);
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
export const useaddUpdateListEntityFieldMapping = (): UseMutationResult<
  any,
  Error
> => {
  const navigate = useNavigate();
  return useMutation(addUpdateListEntityFieldMapping, {
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

export const usePostMock = (): UseMutationResult<any, Error> => {
  // const navigate = useNavigate();
  return useMutation(PostMock, {
    onSuccess: () => {
      toast.success("Entity Mocked  successfully!", {
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
export const useEntities = (text: any): UseQueryResult<any> => {
  return useQuery(["entities ", text], () => fetchall(text), {
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

export const useOneEntityFieldMappingsByEntityId = (
  data: any
): UseQueryResult<any> => {
  return useQuery(["one-entity"], () => EntityFieldMappingsByEntityId(data), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};

export const useOneEntityMockingTo = (data: any): UseQueryResult<any> => {
  return useQuery(["one_to "], () => fetchOneConnectionTo(data), {
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

export const useGetAllEntityField = (): UseQueryResult<any> => {
  return useQuery(["get-all-fields "], () => fetchEntityFieldGetfields(), {
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Error fetching one : ", error.message);
    },
  });
};
