import { Container, Content } from "./styles";
import { Employee } from "../Employee/index";
import { Breadcrumb } from "../../../../components/Breadcrumb/index";
import { useEffect, useState } from "react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { IEmployee } from "../../interfaces/IEmployee";
import { Navigate, useLocation } from "react-router-dom";
import { Load } from "../../../../styles/global";
import LoadImg from "../../../../assets/loading.svg";
import { notify } from "../../../../utils/notification";

interface LocationState {
  message: string | undefined;
}

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const message = (location.state as LocationState)?.message;

  const auth = useAuth();

  useEffect(() => {
    setLoading(true);
    api
      .get("/employees", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setEmployees(result.data);
        setLoading(false);
        if (message) notify(message, "success");
      })
      .catch((error) => {
        if (error.response.data.message === "Token invalid") {
          auth.logout();
          return <Navigate to="/auth/login" />;
        }

        notify(error.message || "Erro desconhecido!", "error");
      });
  }, []);

  return (
    <Container>
      <Breadcrumb
        activeLink="Funcionários"
        links={[
          {
            name: "Main",
            path: "/",
          },
        ]}
        employeeToolbar={true}
      />

      {loading && (
        <Load>
          <img src={LoadImg} alt="Loading Image" />
          <h1>Carregando...</h1>
        </Load>
      )}

      {!loading && (
        <Content>
          {employees.map((employee: IEmployee) => (
            <Employee key={employee.id} employee={employee} />
          ))}
        </Content>
      )}
    </Container>
  );
};
