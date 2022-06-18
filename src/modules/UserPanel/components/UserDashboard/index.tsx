import { Breadcrumb } from "../../../../components/Breadcrumb";
import { Container, Content } from "./styles";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { useEffect, useState } from "react";
import { api } from "../../../../config/axios-config";
import { IUser } from "../../../Users/interfaces/IUser";
import { format } from "date-fns";
import { IEmployee } from "../../../Employees/interfaces/IEmployee";

export const UserDashboard: React.FC = () => {
  const auth = useAuth();

  const [user, setUser] = useState<IUser>();
  const [employee, setEmployee] = useState<IEmployee>();

  useEffect(() => {
    api
      .get(`/users/${auth.user_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setUser(result.data);
      })
      .then(() => {
        if (user?.Employee) setEmployee(user?.Employee[0]);
      });
  }, []);

  return (
    <Container>
      <Breadcrumb activeLink="Painel" employeeToolbar={false} />

      <Content>
        <h1>
          Seja bem vindo <strong>{auth.username}</strong>{" "}
        </h1>

        <div className="panels">
          <div>
            <p>Próximas Férias:</p>
            <p>
              <strong>
                {employee && employee.vacation
                  ? format(
                      new Date(employee.vacation.toString().slice(0, -1)),
                      "dd/MM/yyyy"
                    )
                  : "XX"}
              </strong>
            </p>
          </div>
          <div>
            <p>Holerites Cadastrados:</p>
            <p>
              <strong>{}</strong>
            </p>
          </div>
        </div>
      </Content>
    </Container>
  );
};
