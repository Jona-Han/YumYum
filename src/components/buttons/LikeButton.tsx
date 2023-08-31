import { IconButton } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

export default function LikeButton() {
  return <IconButton size="lg" aria-label="Like Post" icon={<FiStar />}></IconButton>;
}
