import { Box, Flex, useColorModeValue, Stack } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './buttons/LoginButton';
import SignupButton from './buttons/SignupButton';
import AvatarButton from './buttons/AvatarButton';
import NotificationButton from './buttons/NotificationButton';

export default function Header() {
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
              {!isAuthenticated && (
                <>
                  <SignupButton />
                  <LoginButton />
                </>
              )}
              {isAuthenticated && (
                <>
                  <NotificationButton />
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
