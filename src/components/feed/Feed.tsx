import { useQuery } from 'react-query';
import { Center, CircularProgress, Flex } from '@chakra-ui/react';
import FeedCard from './FeedCard';
import { useAuth0 } from '@auth0/auth0-react';
import getFeed from '../../services/feedService';


export default function Feed() {
  const { getAccessTokenSilently } = useAuth0();
  const { data: feedData, isLoading } = useQuery(['feed'], fetchPost(getAccessTokenSilently));

  function fetchPost(getAccessTokenSilently: any) {
    return async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await getFeed(accessToken);

        if (!response.data) {
            throw new Error(response.error?.message);
        }
        return response.data;
    };
  }

  if (isLoading) {
    return (
      <Center w="100%" h="80vh">
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
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
