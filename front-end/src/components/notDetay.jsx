import { useNotContext } from "../hooks/useNotContext";
import moment from "moment";
import { useAuthContext } from "../hooks/useAuthContext";

const NotDetay = ({ not }) => {
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();

  const handleClick = async () => {
    if (!kullanici) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/notlar/" + not._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${kullanici.token}`,
        },
      },
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "NOT_SIL", payload: json });
    }
  };

  return (
    <div className="not-detay">
      <h4>{not?.baslik}</h4>
      <p>{not?.aciklama}</p>
      <p
        style={{
          fontSize: "12px",
          color: "#999",
          marginTop: "5px",
          fontStyle: "italic",
        }}
      >
        {moment(not?.createdAt).fromNow()}
      </p>
      {/*  ↑↑↑ Doğru kullanım */}
      <span onClick={handleClick} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
};

export default NotDetay;
