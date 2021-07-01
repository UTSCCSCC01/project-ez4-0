import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Dashboard from "./pages/Dashboard/Dashboard";

import UnAuthPageHeader from "./components/UnAuthPageHeader";
import AuthPageHeader from "./components/AuthPageHeader";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/profile">
          <UnAuthPageHeader />
          <ProfilePage />
        </Route>
        <Route path="/login">
          <UnAuthPageHeader />
          <LoginPage />
        </Route>
        <Route path="/signup">
          <UnAuthPageHeader />
          <SignupPage />
        </Route>
        <Route path="/reset">
          <UnAuthPageHeader />
          <ResetPasswordPage />
        </Route>
        <Route path="/reset_confirm">
          <UnAuthPageHeader />
          <ResetPasswordConfirmPage />
        </Route>
        <Route path="/home">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <UnAuthPageHeader />
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}
