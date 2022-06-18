import { Breadcrumb } from "../../../../components/Breadcrumb";
import { Container, Content } from "./styles";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { Database } from "phosphor-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../../utils/notification";

interface IFormData {
  name: string;
  email: string;
}

type IHandleFormData = (e: ChangeEvent<HTMLInputElement>) => void;

export const EditUser = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
  });

  useEffect(() => {
    api
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setFormData({
          name: result.data.name,
          email: result.data.email,
        });
      })
      .catch((error) => {
        if (error.response.data.message === "Token invalid") {
          auth.logout();
          return <Navigate to="/auth/login" />;
        }
        notify(error.message || "Erro desconhecido!", "error");
      });
  }, []);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await api.put(`/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      navigate("/usuarios", {
        state: {
          message: `Usuário ${result.data.name} atualizado com sucesso`,
        },
      });
    } catch (error: any) {
      notify(
        error.response.data.message || error.message || "Erro desconhecido!",
        "error"
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
        <p className="error"></p>

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

          <button>
            <Database size={20} weight="bold" />
            Atualizar
          </button>
        </form>
      </Content>
    </Container>
  );
};
