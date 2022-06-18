import { Breadcrumb } from "../../../../components/Breadcrumb";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { Container, Content } from "./styles";
import { useState, useEffect } from "react";
import { api } from "../../../../config/axios-config";
import { IEmployee } from "../../../Employees/interfaces/IEmployee";

export const Dashboard: React.FC = () => {
  const auth = useAuth();

  const [employeesTotal, setEmployeesTotal] = useState(0);
  const [holeritesTotal, setHoleritesTotal] = useState(0);

  console.log(holeritesTotal);

  useEffect(() => {
    api
      .get("/employees", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setEmployeesTotal(response.data.length);
        let paystubs: number = 0;

        response.data.map((employee: IEmployee) => {
          if (employee.PayStub) {
            paystubs += employee.PayStub.length;
          }
        });

        setHoleritesTotal(paystubs);
      });
  }, []);

  return (
    <Container>
      <Breadcrumb activeLink="Main" employeeToolbar={false} />

      <Content>
        <h1>
          Seja bem vindo <strong>{auth.username}</strong>{" "}
        </h1>

        <div className="panels">
          <div>
            <p>Colaboradores Cadastrados:</p>
            <p>
              <strong>{employeesTotal}</strong>
            </p>
          </div>
          <div>
            <p>Holerites Cadastrados:</p>
            <p>
              <strong>{holeritesTotal}</strong>
            </p>
          </div>
        </div>
      </Content>
    </Container>
  );
};
