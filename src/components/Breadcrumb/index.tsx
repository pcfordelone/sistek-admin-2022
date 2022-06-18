import { UserPlus } from "phosphor-react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

interface IBreadcrumbLink {
  name: string;
  path: string;
}

interface IBreadcrumbProps {
  activeLink: string;
  links?: IBreadcrumbLink[];
  employeeToolbar: boolean;
  userToolbar?: boolean;
}

export const Breadcrumb = ({
  activeLink,
  links,
  employeeToolbar,
  userToolbar,
}: IBreadcrumbProps) => {
  return (
    <Container>
      <h1>
        {links &&
          links.map((link: IBreadcrumbLink, key: number) => (
            <Link to={link.path} key={key}>
              <span>{key !== 0 ? ` / ${link.name}` : link.name}</span>
            </Link>
          ))}
        {links && " / "}
        {activeLink}
      </h1>

      {employeeToolbar && (
        <Link to="/funcionarios/novo">
          <button>
            <UserPlus size={24} color="#000" weight="bold" />
            Cadastrar Colaborador
          </button>
        </Link>
      )}
      {userToolbar && (
        <Link to="/usuarios/novo">
          <button>
            <UserPlus size={24} color="#000" weight="bold" />
            Cadastrar Usuário
          </button>
        </Link>
      )}
    </Container>
  );
};
