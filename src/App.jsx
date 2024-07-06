import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import { ThemeProvider } from "./pages/components/ThemeProvider";
import Register from "./pages/Auth/Register";
import "./App.css";
import { Login } from "./pages/Auth/Login";
import PageNotFound from "./pages/Misc/404";
import AccountActivation from "./pages/Auth/AccountActivation";
import AccountActivated from "./pages/Auth/AccountActivated";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";
import ForgotUsername from "./pages/Auth/ForgotUsername";
import ResetUsernameConfirm from "./pages/Auth/ResetUsernameConfirm";
import Dashboard from "./pages/user/Dashboard";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate" element={<AccountActivation />} />
          <Route path="/activated" element={<AccountActivated />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-username" element={<ForgotUsername />} />
          <Route
            path="/reset-password-confirm"
            element={<ResetPasswordConfirm />}
          />
          <Route
            path="/reset-username-confirm"
            element={<ResetUsernameConfirm />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
