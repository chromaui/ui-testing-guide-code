import { useAuth } from "./useAuth";
import InboxScreen from "./InboxScreen";
import LoginScreen from "./LoginScreen";
import "./index.css";
function App() {
  const [user, logIn] = useAuth();

  return <>{user?.token ? <InboxScreen /> : <LoginScreen onLogIn={logIn} />}</>;
}

export default App;
