import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignupPage from './pages/SignupPage/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UserPost from './components/UserPost';
import UserPostPage from './pages/UserPostPage/UserPostPage';
import AllUserPosting from './pages/UserPostPage/UserPostPage';

import UnAuthPageHeader from "./components/UnAuthPageHeader";

export default function AppRouter() {
  return (
    <Router>
      {/* <UnAuthPageHeader/> */}
      <Switch>
        <Route path="/post">
          <AllUserPosting />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/login">
          <LoginPage/>  
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
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}
