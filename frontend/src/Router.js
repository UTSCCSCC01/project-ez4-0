import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route>
          <LandingPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/reset">
          <ResetPasswordPage />
        </Route>
        <Route path="/reset_confirm">
          <ResetPasswordConfirmPage />
        </Route>
      </Switch>
    </Router>
  );
}
