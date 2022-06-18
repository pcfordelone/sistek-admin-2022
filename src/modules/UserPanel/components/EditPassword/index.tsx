import { useState, ChangeEvent, FormEvent } from "react";
import { Container } from "../../../../styles/global";
import { Breadcrumb } from "../../../../components/Breadcrumb/index";
import { Content } from "./styles";
import { Database } from "phosphor-react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../../utils/notification";

export const EditPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    api
      .patch(
        `users/change-password/${auth.user_id}`,
        {
          password,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((response) => {
        navigate("/dashboard", {
          state: {
            message: `Senha atualizada com sucesso`,
          },
        });
      })
      .catch((error) => {
        notify(
          error.response.data.message ||
            "Erro desconhecido, informe o webmaster",
          "error"
        );
      });
  };

  return (
    <Container>
      <Breadcrumb
        activeLink="Alterar Senha"
        links={[
          {
            name: "Painel do Usuário",
            path: "/dashboard",
          },
        ]}
        employeeToolbar={false}
      />

      <Content>
        <h1>Altere aqui sua senha:</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <input
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          <button type="submit">
            <Database size={20} weight="bold" />
            Alterar Senha
          </button>
        </form>
      </Content>
    </Container>
  );
};
