import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";

interface PrivatePageProps {
  children?: React.ReactNode;
  admin?: boolean;
}

export const PrivatePage: React.FC<PrivatePageProps> = ({
  children,
  admin,
}: PrivatePageProps) => {
  const auth = useAuth();

  if (!auth.email) {
    return <Navigate to="/auth/login" />;
  }

  if (admin) {
    if (auth.role === "USER") {
      return <Navigate to="/dashboard" />;
    }
  }

  return <>{children}</>;
};
