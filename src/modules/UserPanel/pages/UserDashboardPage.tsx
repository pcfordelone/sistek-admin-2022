import { UserDashboard } from "../components/UserDashboard";
import { UserHeader } from "../../../components/UserHeader/index";
export const UserDashboardPage: React.FC = () => {
  return (
    <>
      <UserHeader />
      <UserDashboard />
    </>
  );
};
