// PrivateRoute.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

interface PrivateRouteProps {
  element?: React.ReactNode;
  path?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const [isAuthenticated] = useState(false);

  //   const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/login");
  }
  return (
    <>
      {" "}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
