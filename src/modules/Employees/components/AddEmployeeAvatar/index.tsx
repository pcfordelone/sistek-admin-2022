import { Breadcrumb } from "../../../../components/Breadcrumb";
import InputMask from "react-input-mask";
import { Database } from "phosphor-react";
import { Container, Content } from "./styles";
import { FormEvent, useState } from "react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { useParams, useNavigate } from "react-router-dom";

export const AddEmployeeAvatar: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    file && formData.append("file", file);

    api
      .patch(`/employees/avatar/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate(`/funcionarios/detalhe/${id}`, {
          state: {
            message: `Avatar incluído com sucesso`,
          },
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
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
            name: "Holerites",
            path: "/holerites",
          },
        ]}
        employeeToolbar={false}
      />

      <Content>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              accept="image/png, image/jpg, image/jpeg"
              className="addFile"
              type="file"
              name="file"
              required
              onChange={handleImageChange}
            />
          </div>

          <button>
            <Database size={20} weight="bold" />
            Incluir
          </button>
        </form>
      </Content>
    </Container>
  );
};
