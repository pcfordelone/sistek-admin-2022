import { Database } from "phosphor-react";
import { Breadcrumb } from "../../../../components/Breadcrumb/index";
import { Container, Content } from "./styles";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { api } from "../../../../config/axios-config";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../../../Authentication/contexts/AuthContext/useAuth";
import InputMask from "react-input-mask";
import { format } from "date-fns";

export const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const { id } = useParams();

  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  const [birthday, setBirthday] = useState("");
  const [vacation, setVacation] = useState("");
  const [since, setSince] = useState("");

  const [aCep, setACep] = useState("");
  const [address, setAddress] = useState("");
  const [aComplement, setAComplement] = useState("");
  const [aCity, setACity] = useState("");
  const [aState, setAState] = useState("");

  useEffect(() => {
    api
      .get(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setPosition(result.data.position);

        if (result.data.birthday) {
          setBirthday(
            format(
              new Date(result.data.birthday.toString().slice(0, -1)),
              "dd/MM/yyyy"
            )
          );
        }

        if (result.data.vacation) {
          setVacation(
            format(
              new Date(result.data.vacation.toString().slice(0, -1)),
              "dd/MM/yyyy"
            )
          );
        }

        if (result.data.since) {
          setSince(
            format(
              new Date(result.data.since.toString().slice(0, -1)),
              "dd/MM/yyyy"
            )
          );
        }

        setRg(result.data.rg);
        setCpf(result.data.cpf);
        setPhone(result.data.phone);

        setACep(result.data.a_cep);
        setAddress(result.data.address);
        setAComplement(result.data.a_complement);
        setACity(result.data.a_city);
        setAState(result.data.a_state);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "Token invalid") {
          auth.logout();
          return <Navigate to="/auth/login" />;
        }
      });
  }, [id]);

  const dateFormat = (date: string) => {
    return (
      date.split("/")[2] + "-" + date.split("/")[1] + "-" + date.split("/")[0]
    );
  };

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await api.put(
        `/employees/${id}`,
        {
          name,
          email,
          position,
          rg,
          cpf,
          phone,
          birthday: birthday ? dateFormat(birthday) : null,
          vacation: vacation ? dateFormat(vacation) : null,
          since: since ? dateFormat(since) : null,
          a_cep: aCep,
          address,
          a_complement: aComplement,
          a_city: aCity,
          a_state: aState,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      navigate("/funcionarios", {
        state: {
          message: `Colaborador ${result.data.name} atualizado com sucesso`,
        },
      });
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const handleCep = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setACep(value);

    if (value.replace("_", "").length === 9) {
      fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.logradouro);
          setACity(data.localidade);
          setAState(data.uf);
        })
        .catch((error) => {
          return;
        });
    }
  };

  return (
    <Container>
      <Breadcrumb
        activeLink="Editar Funcionário"
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
        employeeToolbar={false}
      />

      <Content>
        <p className="error">{error}</p>
        <form onSubmit={handleForm}>
          <h2>Dados Pessoais:</h2>
          <div className="form-group">
            <input
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              type="text"
              placeholder="Nome"
            />
            <input
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="E-mail"
            />
            <input
              value={position}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPosition(e.target.value)
              }
              type="text"
              placeholder="Cargo"
            />
          </div>
          <div className="form-group">
            <InputMask
              mask="99.999.999-9"
              value={rg}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRg(e.target.value)
              }
              type="text"
              placeholder="RG"
            />
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCpf(e.target.value)
              }
              type="text"
              placeholder="CPF"
            />
            <InputMask
              mask="99 99999-9999"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              type="text"
              placeholder="Telefone/WhatsApp"
            />
          </div>
          <div className="form-group">
            <InputMask
              mask="99/99/9999"
              value={birthday}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBirthday(e.target.value)
              }
              type="text"
              placeholder="Data de Nascimento"
            />
            <InputMask
              mask="99/99/9999"
              value={since}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSince(e.target.value)
              }
              type="text"
              placeholder="Na Sistek desde"
            />
            <InputMask
              mask="99/99/9999"
              value={vacation}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVacation(e.target.value)
              }
              type="text"
              placeholder="Próximas Férias"
            />
          </div>

          <h2>Endereço:</h2>
          <div className="form-group cep">
            <InputMask
              mask="99999-999"
              value={aCep}
              onChange={handleCep}
              type="text"
              placeholder="CEP"
            />
          </div>

          <div className="address">
            <input
              value={address}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
              type="text"
              placeholder="Endereço"
            />
            <input
              value={aComplement}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAComplement(e.target.value)
              }
              type="text"
              placeholder="Complemento"
            />
            <input
              value={aCity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setACity(e.target.value)
              }
              type="text"
              placeholder="Cidade"
            />
            <input
              value={aState}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAState(e.target.value)
              }
              type="text"
              placeholder="Estado"
            />
          </div>

          <button>
            <Database size={20} weight="bold" />
            Atualizar
          </button>
        </form>
      </Content>
    </Container>
  );
};
