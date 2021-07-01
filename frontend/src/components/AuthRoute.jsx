import { Redirect } from 'react-router-dom';

export default function AuthRoute(props) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return <Redirect to="/login"/>
  }
  return props.children;
}
