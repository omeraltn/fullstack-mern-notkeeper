import { useState } from "react";
import { useSignUp } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState();
  const [parola, setParola] = useState();

  const { signup, yukleniyor, hata } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  console.log(email, parola);
    await signup(email, parola);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Üye Ol</h3>
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

export default Signup;
