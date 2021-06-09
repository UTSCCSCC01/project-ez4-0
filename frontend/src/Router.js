import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignupPage/>
        </Route>
      </Switch>
    </Router>
  )
}