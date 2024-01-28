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

const getcommunicationscount = async (data: any): Promise<any> => {
  // Create a new URLSearchParams object
  const params = new URLSearchParams();

  // Iterate over the key-value pairs in the data object and append them to the URLSearchParams
  for (const [key, value] of Object.entries(data)) {
    params.append(key, String(value));
  }

  // Use the params object in your URL
  const queryString = params.toString();
  const response = await instance.get(
    `Communication/get-communications-count/?${queryString}`
  );
  return response.data;
};

const fetchTopEntities = async (): Promise<any> => {
  const response = await instance.get(`Entity/get-top-entities/`);
  return response.data;
};
const fetchCommunicationgetcommunicationsperstatusmonth =
  async (): Promise<any> => {
    const response = await instance.get(
      `Communication/get-communications-per-status-month`
    );
    return response.data;
  };

const fetchCommunicationgetcommunicationspertypemonth =
  async (): Promise<any> => {
    const response = await instance.get(
      `Communication/get-communications-per-type-month`
    );
    return response.data;
  };
const fetchAPICommunicationgetapicommunicationssend =
  async (): Promise<any> => {
    const response = await instance.get(
      `APICommunication/get-api-communications-send`
    );
    return response.data;
  };

const fetchAPICommunicationgetapicommunicationsreceive = async (
  data: any
): Promise<any> => {
  const params = new URLSearchParams();

  // Iterate over the key-value pairs in the data object and append them to the URLSearchParams
  for (const [key, value] of Object.entries(data)) {
    params.append(key, String(value));
  }

  // Use the params object in your URL
  const queryString = params.toString();
  const response = await instance.get(
    `APICommunication/get-api-communications-receive?${queryString}`
  );
  return response.data;
};

const addUpdate = async (payload: any): Promise<any> => {
  const response = await instance.post("Lookup/add-update-lookup", payload);
  return response.data;
};

const deleteone = async (payload: any): Promise<any> => {
  const response = await instance.delete(`Lookup/${payload.id}`);
  return response.data;
};
export const useAddUpdateLookup = (): UseMutationResult<any, Error> => {
  const navigate = useNavigate();
  return useMutation(addUpdate, {
    onSuccess: () => {
      toast.success("Lookup Updated  successfully!", {
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

export const useDeleteLookup = (): UseMutationResult<any, Error> => {
  const query = useQueryClient();
  return useMutation(deleteone, {
    onSuccess: () => {
      toast.success("Lookup Delete  successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      query.invalidateQueries("Lookupes");
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
export const useFetchCommunicationgetcommunicationsperstatusmonth =
  (): UseQueryResult<any> => {
    return useQuery(
      ["Communicationgetcommunicationsperstatusmonth"],
      () => fetchCommunicationgetcommunicationsperstatusmonth(),
      {
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
            "Error fetching Lookupes : ",
            error?.response?.data?.Message
          );
        },
      }
    );
  };
export const useFetchCommunicationgetcommunicationspertypemonth =
  (): UseQueryResult<any> => {
    return useQuery(
      ["Communicationgetcommunicationspertypemonth"],
      () => fetchCommunicationgetcommunicationspertypemonth(),
      {
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
            "Error fetching Lookupes : ",
            error?.response?.data?.Message
          );
        },
      }
    );
  };
export const useGetTopEntities = (): UseQueryResult<any> => {
  return useQuery(["fetchTopEntities"], () => fetchTopEntities(), {
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
        "Error fetching Lookupes : ",
        error?.response?.data?.Message
      );
    },
  });
};

export const useFetchAPICommunicationgetapicommunicationssend =
  (): UseQueryResult<any> => {
    return useQuery(
      ["APICommunicationgetapicommunicationssend"],
      () => fetchAPICommunicationgetapicommunicationssend(),
      {
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
            "Error fetching Lookupes : ",
            error?.response?.data?.Message
          );
        },
      }
    );
  };
export const useFetchAPICommunicationgetapicommunicationsreceive = (
  data: any
): UseQueryResult<any> => {
  return useQuery(
    ["APICommunicationgetapicommunicationsreceive", data],
    () => fetchAPICommunicationgetapicommunicationsreceive(data),
    {
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
          "Error fetching Lookupes : ",
          error?.response?.data?.Message
        );
      },
    }
  );
};

export const useGetCommunicationsCount = (data: any): UseQueryResult<any> => {
  return useQuery(
    ["communicationscount ", data],
    () => getcommunicationscount(data),
    {
      onSuccess: () => {},
      onError: (error: Error) => {
        console.error("Error fetching one : ", error.message);
      },
    }
  );
};
