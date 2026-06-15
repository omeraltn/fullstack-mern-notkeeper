import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotContextProvider } from "./contexts/notContext.jsx";
import moment from "moment";
import "moment/locale/tr";
import { AuthContextProvider } from "./contexts/authContext.jsx";

// Manuel olarak Türkçe'yi ayarla
moment.updateLocale("tr", {
  relativeTime: {
    future: "%s sonra",
    past: "%s önce",
    s: "birkaç saniye",
    m: "bir dakika",
    mm: "%d dakika",
    h: "bir saat",
    hh: "%d saat",
    d: "bir gün",
    dd: "%d gün",
    M: "bir ay",
    MM: "%d ay",
    y: "bir yıl",
    yy: "%d yıl",
  },
});

moment.locale("tr");

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <NotContextProvider>
      <App />
    </NotContextProvider>
  </AuthContextProvider>,
);
