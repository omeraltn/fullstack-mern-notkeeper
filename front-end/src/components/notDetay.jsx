import { useNotContext } from "../hooks/useNotContext";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";

const NotDetay = ({ not }) => {
  const { dispatch } = useNotContext();
  const { kullanici } = useAuthContext();

  const handleClick = async () => {
    if (!kullanici) return;

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
      <p className="zaman">{moment(not?.createdAt).fromNow()}</p>
      <span
        onClick={handleClick}
        className="material-symbols-outlined"
        title="Sil"
      >
        delete
      </span>
    </div>
  );
};

export default NotDetay;
