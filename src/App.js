import { ChakraProvider } from '@chakra-ui/react';
import { InboxScreen } from './InboxScreen';
import { LoginScreen } from './LoginScreen';
import { theme } from './theme';
import { useAuth } from './useAuth';

function App() {
  const [user, logIn] = useAuth();

  return (
    <ChakraProvider theme={theme}>
      {user?.token ? <InboxScreen /> : <LoginScreen onLogIn={logIn} />}
    </ChakraProvider>
  );
}

export default App;
