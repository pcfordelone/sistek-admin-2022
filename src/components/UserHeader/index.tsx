import { Container, Content } from "./styles";

import logoImg from "../../assets/logotipo.svg";
import serviceIconsImg from "../../assets/service_icons.svg";
import exitIconImg from "../../assets/icon-exit.svg";
import { useContext } from "react";
import { AuthContext } from "../../modules/Authentication/contexts/AuthContext/index";
import { Link } from "react-router-dom";
import { House, Key } from "phosphor-react";

export const UserHeader: React.FC = () => {
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
            <Link to={"/dashboard/alterar-senha"}>
              <button className="outlined" type="button">
                <Key size={32} color="#a5cd39"></Key>
                Alterar Senha
              </button>
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
