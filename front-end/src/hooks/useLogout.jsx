import { useAuthContext } from "./useAuthContext";
import { useNotContext } from "./useNotContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: notDispatch } = useNotContext();

  const logout = () => {
    localStorage.removeItem("Kullanici");
    notDispatch({ type: "NOT_DOLDUR", payload: null });
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
