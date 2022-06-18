import { Breadcrumb } from "../../../../components/Breadcrumb";
import { Container, Content } from "./styles";
import { useState, ChangeEvent, FormEvent } from "react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { Database } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../../utils/notification";

interface IFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

type IHandleFormData = (e: ChangeEvent<HTMLInputElement>) => void;

export const AddUser = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleNameChange: IHandleFormData = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: event.target.value,
    }));
  };
  const handleEmailChange: IHandleFormData = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: event.target.value,
    }));
  };
  const handlePasswordChange: IHandleFormData = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: event.target.value,
    }));
  };
  const handleConfirmPasswordChange: IHandleFormData = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      confirm_password: event.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await api.post("/users", formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      navigate("/usuarios", {
        state: {
          message: `Usuário ${result.data.name} incluído com sucesso`,
        },
      });
    } catch (error: any) {
      notify(
        error.response.data.message || error.message || "Erro desconhecido!"
      );
    }
  };

  return (
    <Container>
      <Breadcrumb
        activeLink="Novo"
        links={[
          {
            name: "Main",
            path: "/",
          },
          {
            name: "usuários",
            path: "/usuarios",
          },
        ]}
        employeeToolbar={false}
      />

      <Content>
        <form onSubmit={handleSubmit}>
          <h2>Dados de Acesso:</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nome"
              value={formData?.name}
              onChange={handleNameChange}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={formData?.email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Digite a senha"
              value={formData?.password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              placeholder="Confirme a senha"
              value={formData?.confirm_password}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <button>
            <Database size={20} weight="bold" />
            Cadastrar
          </button>
        </form>
      </Content>
    </Container>
  );
};
