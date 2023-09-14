import { useQuery, useQueries } from 'react-query';
import { Center, CircularProgress, Flex } from '@chakra-ui/react';
import FeedCard from './FeedCard';
import { useAuth0 } from '@auth0/auth0-react';
import { getThreeRandomPosts, getPublicProfile } from '../../services/feedService';
import UserPost from '../../types/UserPost';

export default function Feed() {
  const { getAccessTokenSilently } = useAuth0();
  const { data: postData, isLoading: postLoading } = useQuery(['randomPosts'], () =>
    fetchPostData(getAccessTokenSilently)
  );

  const userData = useQueries(
    postData?.map((post: { id: any; user_id: string; }) => ({
      queryKey: ['user', post.id],
      queryFn: () => fetchUserData(post.user_id),
      enabled: !postLoading && postData && postData.length > 0,
    })) || []
  );

  async function fetchPostData(getAccessTokenSilently: any) {
    const accessToken = await getAccessTokenSilently();
    const response = await getThreeRandomPosts(accessToken);

    if (!response.data) {
      throw new Error(response.error?.message);
    }
    return response.data;
  }

  async function fetchUserData(userID: string) {
    const response = await getPublicProfile(userID);
    if (!response.data) {
      throw new Error(response.error?.message);
    }
    return response.data;
  }

  if (postLoading) {
    return (
      <Center w="100%" h="80vh">
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  }

  //Create UserPosts objects to map through to create feedCard
  const cardData: UserPost[] = [];
  for (let i = 0; i < 3; i++) {
    cardData.push({
      post: {
        content: postData[i].content,
        dateCreated: postData[i].date_created,
        numOfReactions: postData[i].num_of_reactions,
      },
      mediaID: 1,
      poster: {
        name: userData[i].data?.profile_name,
        id: postData[i].user_id,
      },
    });
  }

  return (
    <>
      <Flex alignItems="center" flexDirection="column" gap="10px">
        {cardData.map((card) => {
          return <FeedCard key={card.mediaID} {...card} />;
        })}
      </Flex>
    </>
  );
}
