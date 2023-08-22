import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button
      as={'a'}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'pink.400'}
      href={'#'}
      _hover={{
        bg: 'pink.300',
      }}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
}
