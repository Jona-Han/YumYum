import {
    Box,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Center,
  } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode
  }
  
  function NavLink (props: Props) {
    const { children } = props
  
    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
      </Box>
    )
  }

export default function AvatarButton() {
  return (
    <Menu>
    <MenuButton
      as={Button}
      rounded={'full'}
      variant={'link'}
      cursor={'pointer'}
      minW={0}
    >
      <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
    </MenuButton>
    <MenuList alignItems={'center'}>
      <br />
      <Center>
        <Avatar
          size={'2xl'}
          src={'https://avatars.dicebear.com/api/male/username.svg'}
        />
      </Center>
      <br />
      <Center>
        <p>Username</p>
      </Center>
      <br />
      <MenuDivider />
      <MenuItem>Placeholder </MenuItem>
      <MenuItem>Account Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  </Menu>
  )
}

