import React from "react";
import Sidebar from "../components/common/Sidebar";

interface LayoutProps {
  children: string | JSX.Element | JSX.Element[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
};

export default Layout;
