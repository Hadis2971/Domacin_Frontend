import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type AuthPayload = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
};

export const useRegisterUser = () => {
  const mutationFn = (user: AuthPayload) => {
    return axios.post("http://127.0.0.1:5000/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => console.log(response),
    onError: (error) => console.log(error),
  });

  return mutation;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutationFn = (user: AuthPayload) => {
    return axios.post("http://127.0.0.1:5000/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      const user = jwtDecode(response.data) as User;

      queryClient.setQueryData(["user"], user);

      sessionStorage.setItem("authToken", response.data);
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  return mutation;
};

export const useAuthUser = () => {
  const queryClient = useQueryClient();

  type GetAuthUserType = AuthPayload | null | undefined;

  const getAuthUser = async (): Promise<GetAuthUserType> =>
    await queryClient.getQueryData(["user"]);

  const storedToken = sessionStorage.getItem("authToken");
  const user = storedToken ? jwtDecode(storedToken) : null;

  return useQuery({
    queryFn: getAuthUser,
    queryKey: ["user"],
    initialData: user as GetAuthUserType,
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return () => {
    sessionStorage.removeItem("authToken");
    queryClient.setQueryData(["user"], null);
    navigate("/auth");
  };
};
