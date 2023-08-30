import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
    });
  };

  return (
    <Button
      as={'a'}
      display={'inline-flex'}
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'pink.400'}
      href={'#'}
      _hover={{
        bg: 'pink.300',
      }}
      onClick={handleLogin}
    >
      Sign In
    </Button>
  );
}
