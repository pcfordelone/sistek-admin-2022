import { Container, Content, PayStubContainer } from "./styles";
import { Breadcrumb } from "../../../../components/Breadcrumb";

import editIconImg from "../../../../assets/icon-edit.svg";
import addIconImg from "../../../../assets/icon-new_document.svg";
import { useEffect, useState } from "react";
import { IEmployee } from "../../interfaces/IEmployee";
import { api } from "../../../../config/axios-config";
import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { format } from "date-fns";
import { CheckCircle, Eye, File, Trash, XCircle } from "phosphor-react";

import { ToastContainer, toast } from "react-toastify";

interface LocationState {
  message: string | undefined;
}

export const EmployeeDetail = () => {
  const [employee, setEmployee] = useState<IEmployee>();
  const { id } = useParams();
  const auth = useAuth();

  const location = useLocation();
  const message = (location.state as LocationState)?.message;

  const [infoActive, setInfoActive] = useState(true);
  const [payStubsActive, setPayStubsActive] = useState(false);

  const handleInfoClick = () => {
    setInfoActive(true);
    setPayStubsActive(false);
  };

  const handlePayStubClick = () => {
    setInfoActive(false);
    setPayStubsActive(true);
  };

  const findEmployeeById = () => {
    api
      .get(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setEmployee(result.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "Token invalid") {
          auth.logout();
          return <Navigate to="/auth/login" />;
        }
      });
  };

  useEffect(() => {
    findEmployeeById();
  }, [id]);

  const handleViewPayStubClick = (url: string) => {
    window.open(
      `http://localhost:3333/files/pay_stubs/${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDeletePayStub = async (payStubId: string) => {
    if (window.confirm("Realmente deseja apagar?")) {
      api
        .delete(`/pay_stubs/${payStubId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(() => {
          findEmployeeById();
          toast.error("Holerite excluído com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            error.response.data.message || error || "Erro desconhecido",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        });
    }
  };

  useEffect(() => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, []);

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Breadcrumb
        employeeToolbar={true}
        activeLink={employee?.name || ""}
        links={[
          {
            name: "Main",
            path: "/",
          },
          {
            name: "Funcionários",
            path: "/funcionarios",
          },
        ]}
      />

      <nav>
        <button
          onClick={handleInfoClick}
          className={infoActive ? "active" : ""}
        >
          Ficha Técnica
        </button>
        <button
          onClick={handlePayStubClick}
          className={payStubsActive ? "active" : ""}
        >
          Holerites
        </button>
      </nav>

      <Content className={infoActive ? "" : "hidden"}>
        <div className="contentItem">
          <img src="/src/assets/user-no_img.svg" alt="" />
        </div>

        <div className="contentItem">
          <h2>
            {employee?.name} <br /> <small>{employee?.position}</small>
          </h2>

          <p>
            na Sistek desde:{" "}
            {employee && employee.since
              ? format(
                  new Date(employee.since.toString().slice(0, -1)),
                  "dd/MM/yyyy"
                )
              : ""}
          </p>

          <ul>
            <li>
              <span>E-mail: </span> {employee?.email}
            </li>
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
              <span>Telefone: </span> {employee?.phone}
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
            <li></li>
            <li>
              <span>RG: </span> {employee?.rg}
            </li>
            <li>
              <span>CPF: </span> {employee?.cpf}
            </li>
            <li></li>
            <li>
              <span>Próximas Férias: </span>
              {employee && employee.vacation
                ? format(
                    new Date(employee.vacation.toString().slice(0, -1)),
                    "dd/MM/yyyy"
                  )
                : ""}
            </li>
          </ul>
        </div>

        <div className="contentItem">
          {employee?.isActive && (
            <p>
              Colaborador Ativo
              <CheckCircle size={20} color="#a5cd39" weight="bold" />
            </p>
          )}
          {!employee?.isActive && (
            <p>
              Colaborador Inativo
              <XCircle size={20} color="red" weight="bold" />
            </p>
          )}

          <div>
            <Link to={`/funcionarios/${employee?.id}`}>
              <button type="button">
                <img src={editIconImg} alt="Editar" />
              </button>
            </Link>
            <Link to={`/holerites/novo/${employee?.id}`}>
              <button type="button">
                <img src={addIconImg} alt="Add Document" />
              </button>
            </Link>
          </div>
        </div>
      </Content>

      <PayStubContainer className={payStubsActive ? "" : "hidden"}>
        <h1>Holerites:</h1>

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
                <button onClick={() => handleViewPayStubClick(item.file_url)}>
                  <Eye size={24} />
                  Visualizar
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => handleDeletePayStub(item.id)}
                >
                  <Trash color="#fff" size={16} weight="bold" />
                </button>
              </div>
            ))}
        </div>
      </PayStubContainer>
    </Container>
  );
};
