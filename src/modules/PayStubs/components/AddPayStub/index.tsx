import { Breadcrumb } from "../../../../components/Breadcrumb";
import InputMask from "react-input-mask";
import { Database } from "phosphor-react";
import { Container, Content } from "./styles";
import { FormEvent, useState } from "react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { useParams, useNavigate } from "react-router-dom";

interface FormData {
  date: string;
  notes: string;
  file: File | null;
}

export const AddPayStub: React.FC = () => {
  const [formValues, setFormValues] = useState<FormData>({
    date: "",
    notes: "",
    file: null,
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      date: event.target.value,
    }));
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      notes: event.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };

  const dateFormat = (date: string) => {
    return (
      date.split("/")[2] + "-" + date.split("/")[1] + "-" + date.split("/")[0]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formValues.file && formData.append("file", formValues.file);
    formData.append("date", dateFormat(formValues.date));
    formData.append("notes", formValues.notes);
    formData.append("employee_id", id as string);

    api
      .post("/pay_stubs", formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate(`/funcionarios/detalhe/${id}`, {
          state: {
            message: `Holerite incluído com sucesso`,
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
        <p className="error"></p>

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group">
            <InputMask
              mask="99/99/9999"
              type="text"
              placeholder="Data do Holerite"
              required
              onChange={handleDateChange}
              value={formValues.date}
            />
            <input
              type="text"
              placeholder="Notas"
              onChange={handleNotesChange}
              value={formValues.notes}
            />
          </div>

          <div className="form-group">
            <input
              accept="image/png, image/jpg, image/jpeg, .pdf"
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
