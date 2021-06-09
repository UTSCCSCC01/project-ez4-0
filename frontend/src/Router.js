import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignupPage from './pages/SignupPage/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignupPage/>
        </Route>
        <Route path="/reset">
          <ResetPasswordPage/>
        </Route>
        <Route path="/reset_confirm">
          <ResetPasswordConfirmPage/>
        </Route>
      </Switch>
    </Router>
  )
}