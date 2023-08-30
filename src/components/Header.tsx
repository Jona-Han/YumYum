import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './buttons/LoginButton';
import SignupButton from './buttons/SignupButton';
import LogoutButton from './buttons/LogoutButton';
import AvatarButton from './buttons/AvatarButton';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        display={{ base: 'none', md: 'block' }}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'flex-end'}>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {!isAuthenticated && (
                <>
                  <SignupButton />
                  <LoginButton />
                </>
              )}
              {isAuthenticated && (
                <>
                  <LogoutButton />
                  <AvatarButton />
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
