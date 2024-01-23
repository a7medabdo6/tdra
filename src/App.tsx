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
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Category from "./pages/Category";
import CategoryDetails from "./pages/CategoryDetails";
const queryClient = new QueryClient();

const router = [
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/entities-management",
    element: (
      <Layout>
        <EntitiesManagement />
      </Layout>
    ),
  },
  {
    path: "/lookup-categories",
    element: (
      <Layout>
        <Category />
      </Layout>
    ),
  },
  {
    path: "/lookup-management/:id",
    element: (
      <Layout>
        <LookupManagement />
      </Layout>
    ),
  },
  {
    path: "/user-management",
    element: (
      <Layout>
        <UserManagement />
      </Layout>
    ),
  },
  {
    path: "/add-role/:id",
    element: (
      <Layout>
        <AddRole />
      </Layout>
    ),
  },
  {
    path: "/user-details/:id",
    element: (
      <Layout>
        <UserDetails />
      </Layout>
    ),
  },
  {
    path: "/entity-details/:id",
    element: (
      <Layout>
        <EntityDetails />
      </Layout>
    ),
  },
  {
    path: "/lookup-details/:id",
    element: (
      <Layout>
        <LookupDetails />
      </Layout>
    ),
  },
  {
    path: "/category-details/:id",
    element: (
      <Layout>
        <CategoryDetails />
      </Layout>
    ),
  },

  {
    path: "/mapping-screen/:id",
    element: (
      <Layout>
        <MappingDynamicInputs />
      </Layout>
    ),
  },
  {
    path: "/mapping-mock/:id",
    element: (
      <Layout>
        <MappingMockup />
      </Layout>
    ),
  },
  {
    path: "/mapping-mock-to/:id",
    element: (
      <Layout>
        <MappingMockingTo />
      </Layout>
    ),
  },
];
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route element={<PrivateRoute />}>
              {router.map((item) => (
                <Route
                  key={item?.path}
                  path={item?.path}
                  element={item?.element}
                />
              ))}
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
