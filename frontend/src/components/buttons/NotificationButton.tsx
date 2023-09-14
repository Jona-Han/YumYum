import { IconButton } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

export default function NotificationButton() {
  return (
    <>
      <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
    </>
  );
}
