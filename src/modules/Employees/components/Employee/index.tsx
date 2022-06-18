import editIconImg from "../../../../assets/icon-edit.svg";
import infoIconImg from "../../../../assets/icon-info.svg";
import addIconImg from "../../../../assets/icon-new_document.svg";
import { IEmployee } from "../../interfaces/IEmployee";
import { EmployeeItem } from "./styles";

import { format } from "date-fns";

import pt from "date-fns/locale/pt-BR";
import { CheckCircle, CheckSquareOffset, XCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { api } from "../../../../config/axios-config";
import { useState } from "react";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";

interface IEmployeeProps {
  employee: IEmployee;
}

export const Employee: React.FC<IEmployeeProps> = ({
  employee,
}: IEmployeeProps) => {
  const [status, setStatus] = useState(employee.isActive);
  const auth = useAuth();

  const handleChangeStatus = () => {
    api
      .patch(
        `/employees/${employee.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then((result) => {
        setStatus(!status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <EmployeeItem>
      <div className="contentItem">
        <img src="/src/assets/user-no_img.svg" alt="" />
      </div>

      <div className="contentItem">
        <h2>
          {employee.name} <br /> <small>{employee.position}</small>
        </h2>
        <p>
          na Sistek desde:
          {employee.since
            ? format(
                new Date(employee.since.toString().slice(0, -1)),
                " dd/MM/yyyy"
              )
            : null}
        </p>
      </div>

      <div className="contentItem">
        {status && (
          <p>
            Colaborador Ativo
            <CheckCircle size={20} color="#a5cd39" weight="bold" />
          </p>
        )}
        {!status && (
          <p>
            Colaborador Inativo
            <XCircle size={20} color="red" weight="bold" />
          </p>
        )}

        <div>
          <Link to={`/funcionarios/${employee.id}`}>
            <button type="button" title="">
              <img src={editIconImg} alt="Editar Funcionário" />
            </button>
          </Link>
          <Link to={`/funcionarios/detalhe/${employee.id}`}>
            <button type="button" title="Detalhe Funcionário">
              <img src={infoIconImg} alt="" />
            </button>
          </Link>
          <button
            onClick={handleChangeStatus}
            type="button"
            title="Alterar Status"
          >
            <CheckSquareOffset size={32} color="#a5cd39" weight="bold" />
          </button>
          <Link to={`/holerites/novo/${employee.id}`}>
            <button type="button">
              <img src={addIconImg} alt="Incluir Novo Holerite" />
            </button>
          </Link>
        </div>
      </div>
    </EmployeeItem>
  );
};
