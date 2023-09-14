import { Center, CircularProgress } from '@chakra-ui/react';

export default function PageLoader() {
  return (
    <Center w="100%" h="100vh">
      <CircularProgress isIndeterminate color="green.300" />
    </Center>
  );
}
