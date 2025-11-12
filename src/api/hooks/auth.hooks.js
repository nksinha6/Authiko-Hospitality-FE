import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const authHooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      queryClient.setQueryData(["user"], data.user);
      navigate("/");
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("authToken");
      queryClient.clear();
      navigate("/login");
    },
  });

  return {
    // Auth state
    user: {},
    isAuthenticated: !!localStorage.getItem("authToken"),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,

    // Auth methods
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};
