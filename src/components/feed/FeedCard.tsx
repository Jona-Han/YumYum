import {
  Image,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  HStack,
  AspectRatio,
} from '@chakra-ui/react';
import LikeButton from '../buttons/LikeButton';
import UserPost from '../../types/UserPost';

export default function FeedCard({ post, mediaID, user }: UserPost) {
  return (
    <Center py={6}>
      <Box
        maxW={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={4}
        overflow={'hidden'}
      >
        <Stack direction={'row'} ml={1} mb={3} spacing={4} align={'center'}>
          <Avatar src={`../../assets/profile/${user.id}`} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{`${user.name}`}</Text>
            <Text color={'gray.500'}>{`${post.dateCreated}`}</Text>
          </Stack>
        </Stack>

        <AspectRatio maxW={'500px'} ratio={4 / 3} bg={'gray.100'} mx={-4} mb={4}>
          <Image src={`../assets/${mediaID}`} />
        </AspectRatio>
        <Stack>
          {/* <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {`${}`}
          </Heading> */}
          <Text color={'gray.500'}>{`${post.content}`}</Text>
        </Stack>

        <HStack mt={3} display="flex" justifyContent="space-evenly">
          <LikeButton />
          <Button padding="24px 150px">See Recipe</Button>
        </HStack>
      </Box>
    </Center>
  );
}
