import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import LookupManagement from "./pages/LookupManagement";
import UserManagement from "./pages/UserManagement";
// import EntityDetails from "./pages/EntityDetails";
// import MappingScreen from "./pages/MappingScreen";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages";
import EntitiesManagement from "./pages/EntitiesManagement";
import Layout from "./Layout";
import EntityDetails from "./pages/EntityDetails";
import MappingScreen from "./pages/MappingScreen";
const router = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/entities-management",
    element: <EntitiesManagement />,
  },
  {
    path: "/lookup-management",
    element: <LookupManagement />,
  },
  {
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    path: "/route-details",
    element: <UserDetails />,
  },
  {
    path: "/entity-details",
    element: <EntityDetails />,
  },
  {
    path: "/mapping-screen",
    element: <MappingScreen />,
  },
];
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {router.map((item) => (
              <Route
                key={item?.path}
                path={item?.path}
                element={item?.element}
              />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>

      {/* <Dashboard /> */}
      {/* <EntitiesManagement /> */}
      {/* <LookupManagement /> */}
      {/* <UserManagement /> */}
      {/* <EntityDetails /> */}
      {/* <MappingScreen /> */}
    </ThemeProvider>
  );
}

export default App;