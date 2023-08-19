import { useQuery } from 'react-query';
import Axios from 'axios';
import { CircularProgress, Flex } from '@chakra-ui/react';
import FeedCard from '../components/FeedCard';

export default function Feed() {
  const { data: feedData, isLoading } = useQuery(['feed'], () => {
    return Axios.get('http://localhost:3000/posts').then((res) => res.data);
  });

  if (isLoading) {
    return <CircularProgress isIndeterminate color="green.300" />;
  }

  return (
    <>
      <Flex alignItems="center" flexDirection="column" gap="10px">
        <FeedCard />
      </Flex>
      <p>{feedData?.data}</p>
    </>
  );
}
