import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  CheckCircle,
  NotePencil,
  XCircle,
  CheckSquareOffset,
  Trash,
} from "phosphor-react";
import { api } from "../../../../config/axios-config";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import { notify } from "../../../../utils/notification";

interface IUser {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: "MASTER" | "ADMIN" | "USER";
}

interface IUserProps {
  user: IUser;
  reloadUsers: () => Promise<void>;
}

export const User: React.FC<IUserProps> = ({
  user,
  reloadUsers,
}: IUserProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState(user.isActive);
  const [currentUser, setCurrentUser] = useState<string>();

  useEffect(() => setCurrentUser(auth.email), []);

  const handleChangeStatus: () => Promise<void> = async () => {
    try {
      const response = await api.patch(
        `/users/${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setStatus(response.data.isActive);
      notify(`Status do usuário ${response.data.name} alterado`, "success");
    } catch (error: any) {
      notify(
        error.response.data.message || error.message || "Erro desconhecido!",
        "error"
      );
    }
  };

  const handleDeleteUser: () => Promise<void> = async () => {
    if (window.confirm("Realmente deseja apagar?")) {
      api
        .delete(`/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((response) => {
          reloadUsers();
          notify(
            `Usuário ${response.data.name} excluído com sucesso.`,
            "success"
          );
        })
        .catch((error) => {
          notify(
            error.response.data.message ||
              error.message ||
              "Erro desconhecido!",
            "error"
          );
        });
    }
  };

  const handleEditUser: () => void = () => {
    return navigate(`/usuarios/${user.id}`);
  };

  return (
    <div>
      <ul>
        <li>
          <input
            type="checkbox"
            value={user.id}
            disabled={user.email === currentUser ? true : false}
          />
        </li>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>
          {status && <CheckCircle size={20} color="#a5cd39" weight="bold" />}
          {!status && <XCircle size={20} color="red" weight="bold" />}
          {status ? "Ativo" : "Inativo"}
        </li>
        <li>
          <button onClick={handleEditUser}>
            <NotePencil size={32} color="#a5cd39" />
          </button>
          <button
            disabled={user.email === currentUser ? true : false}
            onClick={handleChangeStatus}
          >
            <CheckSquareOffset size={32} color="#a5cd39" />
          </button>
          <button
            disabled={user.email === currentUser ? true : false}
            onClick={handleDeleteUser}
          >
            <Trash size={32} color="#a5cd39" />
          </button>
        </li>
      </ul>
    </div>
  );
};
