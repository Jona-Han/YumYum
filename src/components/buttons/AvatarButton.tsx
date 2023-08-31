import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Center,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

function NavLink(props: any) {
  const { children } = props;

  return (
    <Center
      as="a"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={props.link}
    >
      {children}
    </Center>
  );
}

export default function AvatarButton() {
    const { logout } = useAuth0();

    const handleLogout = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Justina Clark</Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <NavLink link='/profile'><MenuItem>Profile</MenuItem></NavLink>
          <NavLink link='/settings'><MenuItem>Settings</MenuItem></NavLink>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
