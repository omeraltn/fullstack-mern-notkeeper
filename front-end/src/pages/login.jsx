import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState();
  const [parola, setParola] = useState();

  const { login, yukleniyor, hata } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, parola);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Giriş Yap</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Parola:</label>
      <input type="password" onChange={(e) => setParola(e.target.value)} />
      <button disabled={yukleniyor} className="" type="submit">
        Üye Ol
      </button>
      {hata && <div className="error">{hata}</div>}
    </form>
  );
};

export default Login;
