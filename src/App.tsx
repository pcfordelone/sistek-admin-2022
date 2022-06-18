import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalStyle } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";

import { AuthContextProvider } from "./modules/Authentication/contexts/AuthContext";

import { EmployeePage } from "./modules/Employees/pages/EmployeePage";
import { AuthLoginPage } from "./modules/Authentication/pages/AuthLoginPage";
import { EmployeesPage } from "./modules/Employees/pages/EmployeesPage";
import { PrivatePage } from "./modules/Authentication/components/ProtectedPage/index";
import { NewEmployeePage } from "./modules/Employees/pages/NewEmployeePage";
import { DashboardPage } from "./modules/Dashboard/pages/DashboardPage";
import { EditEmployeePage } from "./modules/Employees/pages/EditEmployee";
import { AddPayStubPage } from "./modules/PayStubs/pages/AddPayStubPage";
import { AddUserPage } from "./modules/Users/pages/AddUserPage";
import { ListUsersPage } from "./modules/Users/pages/ListUsersPage";
import { EditUserPage } from "./modules/Users/pages/EditUserPage";
import { UserDashboardPage } from "./modules/UserPanel/pages/UserDashboardPage";
import { ToastContainer } from "react-toastify";
import { AddEmployeeAvatarPage } from "./modules/Employees/pages/AddEmployeeAvatarPage";
import { ChangePasswordPage } from "./modules/UserPanel/pages/ChangePasswordPage";

function App() {
  return (
    <AuthContextProvider>
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
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<AuthLoginPage />} />
          <Route
            path="/"
            element={
              <PrivatePage admin>
                <DashboardPage />
              </PrivatePage>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivatePage>
                <UserDashboardPage />
              </PrivatePage>
            }
          />
          <Route
            path="/dashboard/alterar-senha"
            element={
              <PrivatePage>
                <ChangePasswordPage />
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
            path="/funcionarios/avatar/:id"
            element={
              <PrivatePage admin>
                <AddEmployeeAvatarPage />
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
