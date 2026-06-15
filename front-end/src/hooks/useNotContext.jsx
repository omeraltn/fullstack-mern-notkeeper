import { NotContext } from "../contexts/notContext";

import { useContext } from "react";

export const useNotContext = () => {
  const context = useContext(NotContext);
  if (!context) {
    throw new Error("context yüklenmedi");
  }
  return context;
};
