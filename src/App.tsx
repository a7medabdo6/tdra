import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import LookupManagement from "./pages/LookupManagement";
import UserManagement from "./pages/UserManagement";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages";
import EntitiesManagement from "./pages/EntitiesManagement";
import Layout from "./Layout";
import EntityDetails from "./pages/EntityDetails";
// import MappingScreen from "./pages/MappingScreen";
import LookupDetails from "./pages/LookupDetails";
import AddRole from "./pages/AddRole";
import MappingDynamicInputs from "./pages/MappingDynamicInputs";
import MappingMockup from "./pages/Mapping-mockup";
import MappingMockingTo from "./pages/Mapping-mockup-to";
const queryClient = new QueryClient();

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
    path: "/add-role/:id",
    element: <AddRole />,
  },
  {
    path: "/user-details/:id",
    element: <UserDetails />,
  },
  {
    path: "/entity-details/:id",
    element: <EntityDetails />,
  },
  {
    path: "/lookup-details/:id",
    element: <LookupDetails />,
  },
  {
    path: "/mapping-screen/:id",
    element: <MappingDynamicInputs />,
  },
  {
    path: "/mapping-mock/:id",
    element: <MappingMockup />,
  },
  {
    path: "/mapping-mock-to/:id",
    element: <MappingMockingTo />,
  },
];
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <ToastContainer />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
