import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export default function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <div>
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
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </div>
  );
}
