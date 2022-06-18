import { Container, Content } from "./styles";
import { Breadcrumb } from "../../../../components/Breadcrumb/index";
import { useEffect, useState, ChangeEvent } from "react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";

import { Navigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { User } from "../User";

import LoadImg from "../../../../assets/loading.svg";
import { Load } from "../../../../styles/global";

interface IUsersSelected {
  users: string[];
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [navActive, setNavActive] = useState(false);
  const [usersSelected, setUsersSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    if (usersSelected.length > 0) {
      setNavActive(true);
      return;
    }
    setNavActive(false);
  }, [usersSelected]);

  useEffect(() => {
    listUsers();
  }, []);

  const listUsers = async () => {
    setLoading(true);

    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setUsers(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === "Token invalid") {
          auth.logout();
          return <Navigate to="/auth/login" />;
        }
      });
  };

  const handleUserSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setUsersSelected([...usersSelected, e.target.value]);
      return;
    }
    setUsersSelected(usersSelected.filter((user) => e.target.value !== user));
  };

  return (
    <Container>
      <Breadcrumb
        activeLink="Usuários"
        links={[
          {
            name: "Main",
            path: "/",
          },
        ]}
        employeeToolbar={false}
        userToolbar={true}
      />

      {loading && (
        <Load>
          <img src={LoadImg} alt="Loading Image" />
          <h1>Carregando...</h1>
        </Load>
      )}

      {!loading && (
        <Content>
          <nav>
            <button disabled={!navActive ? true : false}>
              Alterar Status Selecionados
            </button>
            <button disabled={!navActive ? true : false}>
              Excluir Selecionados
            </button>
          </nav>

          <div className="title">
            <ul>
              <li></li>
              <li>Nome</li>
              <li>E-mail</li>
              <li>Status</li>
              <li>Ações</li>
            </ul>
          </div>

          {users.map((user: IUser) => (
            <User reloadUsers={listUsers} user={user} key={user.id} />
          ))}
        </Content>
      )}
    </Container>
  );
};
