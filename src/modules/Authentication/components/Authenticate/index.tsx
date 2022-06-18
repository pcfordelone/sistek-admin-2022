import { Container } from "./styles";

import logoImg from "../../../../assets/logotipo.svg";
import serviceIconsImg from "../../../../assets/service_icons.svg";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Authenticate: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await auth.login(email, password);
      console.log(response);

      navigate("/");
    } catch (err) {
      toast.error("Usuário ou senha inválidos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <img src={logoImg} alt="Sistek Logotipo" />
      <p>Faça seu login inserindo seus dados abaixo:</p>

      <p className="alert">{error}</p>

      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="Digite seu e-mail"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />

        <div>
          <button className="outlined" type="button">
            Esqueci minha senha
          </button>
          <button type="submit">Entrar</button>
        </div>
      </form>

      <img className="serviceImg" src={serviceIconsImg} alt="Sistek Serviços" />
    </Container>
  );
};
