import { Box, CircularProgress } from '@chakra-ui/react';

export default function PageLoader() {
  return (
    <Box>
      <CircularProgress isIndeterminate color="green.300" />
    </Box>
  );
}
