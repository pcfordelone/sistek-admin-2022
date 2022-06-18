import { Breadcrumb } from "../../../../components/Breadcrumb";
import { Container, Content } from "./styles";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { useEffect, useState } from "react";
import { api } from "../../../../config/axios-config";
import { IUser } from "../../../Users/interfaces/IUser";
import { format } from "date-fns";
import { IEmployee } from "../../../Employees/interfaces/IEmployee";
import { Eye, File, Trash, UserCirclePlus } from "phosphor-react";
import { useLocation } from "react-router-dom";
import { notify } from "../../../../utils/notification";
import { Load } from "../../../../styles/global";
import LoadImg from "../../../../assets/loading.svg";

interface LocationState {
  message: string | undefined;
}

export const UserDashboard: React.FC = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();
  const [employee, setEmployee] = useState<IEmployee>();

  const location = useLocation();
  const message = (location.state as LocationState)?.message;

  useEffect(() => {
    setLoading(true);
    api
      .get(`/users/${auth.user_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setUser(result.data);
        if (message) notify(message, "success");
      });
  }, []);

  useEffect(() => {
    api
      .get(`/employee`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          email: auth.email,
        },
      })
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      });
  }, [user]);

  const handleViewPayStubClick = (url: string) => {
    window.open(
      `http://localhost:3333/files/pay_stubs/${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Container>
      <Breadcrumb activeLink="Painel do Usuário" employeeToolbar={false} />

      {loading && (
        <Load>
          <img src={LoadImg} alt="Loading Image" />
          <h1>Carregando...</h1>
        </Load>
      )}

      {!loading && (
        <Content>
          <h1>
            Seja bem vindo <strong>{auth.username}</strong>{" "}
          </h1>

          <div>
            <div className="aside">
              {employee?.avatar_url ? (
                <img
                  className="avatar"
                  src={`http://localhost:3333/files/employees/${employee.avatar_url}`}
                  alt="Avatar Funcionário"
                />
              ) : (
                <img
                  className="avatarNoImg"
                  src="/src/assets/user-no_img.svg"
                  alt=""
                />
              )}

              <p>
                Próximas Férias:
                <strong>
                  {employee && employee.vacation
                    ? format(
                        new Date(employee.vacation.toString().slice(0, -1)),
                        "dd/MM/yyyy"
                      )
                    : ""}
                </strong>
              </p>
            </div>
            <div className="userContent">
              <h2>Holerites:</h2>

              <div>
                {employee?.PayStub &&
                  employee?.PayStub.map((item) => (
                    <div className="pay-stub-item" key={item.id}>
                      <File size={72} weight="thin" color="#ffffff" />
                      <p>
                        {format(
                          new Date(item.date.toString().slice(0, -1)),
                          "dd/MM/yyyy"
                        )}
                      </p>
                      <p>{item.notes}</p>
                      <button
                        onClick={() => handleViewPayStubClick(item.file_url)}
                      >
                        <Eye size={24} />
                        Visualizar
                      </button>
                    </div>
                  ))}
              </div>

              <h2>Ficha Técnica:</h2>
              <div>
                <ul>
                  <li>
                    <span>E-mail: </span> {employee?.email}
                  </li>
                  <li>
                    <span>RG: </span> {employee?.rg}
                  </li>
                  <li>
                    <span>CPF: </span> {employee?.cpf}
                  </li>
                  <li>
                    <span>Telefone: </span> {employee?.phone}
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Aniversário: </span>
                    {employee && employee.birthday
                      ? format(
                          new Date(employee.birthday.toString().slice(0, -1)),
                          "dd/MM/yyyy"
                        )
                      : ""}
                  </li>
                  <li>
                    <span>Na Sistek desde: </span>
                    {employee && employee.since
                      ? format(
                          new Date(employee.since.toString().slice(0, -1)),
                          "dd/MM/yyyy"
                        )
                      : ""}
                  </li>
                  <li>
                    <span>Endereço: </span>{" "}
                    {employee &&
                      employee.a_cep &&
                      `${employee?.address} - ${employee?.a_city}/${employee?.a_state}`}
                  </li>
                  <li>
                    <span>CEP: </span> {employee && employee.a_cep}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Content>
      )}
    </Container>
  );
};
