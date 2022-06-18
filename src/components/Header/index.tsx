import { Container, Content } from "./styles";

import logoImg from "../../assets/logotipo.svg";
import serviceIconsImg from "../../assets/service_icons.svg";
import exitIconImg from "../../assets/icon-exit.svg";
import { useContext } from "react";
import { AuthContext } from "../../modules/Authentication/contexts/AuthContext/index";
import { Link } from "react-router-dom";
import { House, HouseSimple } from "phosphor-react";

export const Header: React.FC = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Sistek Logotipo" />

        <div>
          <div className="headerColumn">
            <img className="serviceImg" src={serviceIconsImg} alt="" />
          </div>
          <div className="headerColumn">
            <Link to={"/"}>
              <button className="outlined" type="button">
                <House size={32} color="#a5cd39"></House>
              </button>
            </Link>
            <Link to={"/funcionarios"}>
              <button type="button">Funcionários</button>
            </Link>
            <Link to={"/usuarios"}>
              <button type="button">Usuários</button>
            </Link>
            <button onClick={handleLogout} className="outlined" type="button">
              <img src={exitIconImg} alt="Sair" />
            </button>
          </div>
        </div>
      </Content>
    </Container>
  );
};
