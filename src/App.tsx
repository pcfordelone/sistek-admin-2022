import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { EmployeePage } from "./modules/Employees/pages/EmployeePage";
import { AuthLoginPage } from "./modules/Authentication/pages/AuthLoginPage";
import { EmployeesPage } from "./modules/Employees/pages/EmployeesPage";
import { AuthContextProvider } from "./modules/Authentication/contexts/AuthContext";
import { PrivatePage } from "./modules/Authentication/components/ProtectedPage/index";
import { NewEmployeePage } from "./modules/Employees/pages/NewEmployeePage";
import { DashboardPage } from "./modules/Dashboard/pages/DashboardPage";
import { EditEmployeePage } from "./modules/Employees/pages/EditEmployee";
import { AddPayStubPage } from "./modules/PayStubs/pages/AddPayStubPage";
import { AddUserPage } from "./modules/Users/pages/AddUserPage";
import { ListUsersPage } from "./modules/Users/pages/ListUsersPage";
import { EditUserPage } from "./modules/Users/pages/EditUserPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<AuthLoginPage />} />
          <Route
            path="/"
            element={
              <PrivatePage>
                <DashboardPage />
              </PrivatePage>
            }
          />
          <Route
            path="/usuarios/novo"
            element={
              <PrivatePage admin>
                <AddUserPage />
              </PrivatePage>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivatePage admin>
                <ListUsersPage />
              </PrivatePage>
            }
          />
          <Route
            path="/usuarios/:id"
            element={
              <PrivatePage admin>
                <EditUserPage />
              </PrivatePage>
            }
          />

          <Route
            path="/funcionarios"
            element={
              <PrivatePage admin>
                <EmployeesPage />
              </PrivatePage>
            }
          />
          <Route
            path="/funcionarios/:id"
            element={
              <PrivatePage admin>
                <EditEmployeePage />
              </PrivatePage>
            }
          />
          <Route
            path="/funcionarios/novo"
            element={
              <PrivatePage admin>
                <NewEmployeePage />
              </PrivatePage>
            }
          />
          <Route
            path="/funcionarios/detalhe/:id"
            element={
              <PrivatePage admin>
                <EmployeePage />
              </PrivatePage>
            }
          />
          <Route
            path="/holerites/novo/:id"
            element={
              <PrivatePage admin>
                <AddPayStubPage />
              </PrivatePage>
            }
          />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
