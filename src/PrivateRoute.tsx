// PrivateRoute.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { useState } from "react";

interface PrivateRouteProps {
  element?: React.ReactNode;
  path?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [user, navigate]);

  if (!isAuthenticated) {
    // This block will not be executed immediately; it will run after the render
    return null;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
