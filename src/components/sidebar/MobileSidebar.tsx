import { useAuth0 } from '@auth0/auth0-react';
import {
  Flex,
  IconButton,
  useColorModeValue,
  FlexProps,
  Text,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import LoginButton from '../buttons/LoginButton';
import AvatarButton from '../buttons/AvatarButton';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export default function MobileSidebar({ onOpen, ...rest }: MobileProps) {
  const { isAuthenticated } = useAuth0();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        YumYum
      </Text>
      {isAuthenticated ? <AvatarButton /> : <LoginButton />}
    </Flex>
  );
}
