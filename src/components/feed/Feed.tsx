import { useQuery, useQueries } from 'react-query';
import { Center, CircularProgress, Flex } from '@chakra-ui/react';
import FeedCard from './FeedCard';
import { useAuth0 } from '@auth0/auth0-react';
import getThreeRandomPosts from '../../services/feedService';
import UserPost from '../../types/UserPost';

export default function Feed() {
  const { getAccessTokenSilently } = useAuth0();
  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
  } = useQuery(['randomPosts'], fetchPostData(getAccessTokenSilently));
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQueries({
    queries: postData.map((post) => {
      return {
        queryKey: ['userData', post.id],
        queryFn: fetchUserDataFromPost(post.user_ID, getAccessTokenSilently),
        enabled: postData && Object.keys(postData).length > 0,
      };
    }),
  });

  function fetchPostData(getAccessTokenSilently: any) {
    return async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await getThreeRandomPosts(accessToken);

      if (!response.data) {
        throw new Error(response.error?.message);
      }
      return response.data;
    };
  }

  function fetchUserDataFromPost(postID: string, getAccessTokenSilently: any) {
    return async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await 
    };
  }

  if (postLoading) {
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
    </>
  );
}
