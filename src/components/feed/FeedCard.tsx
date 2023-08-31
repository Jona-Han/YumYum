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
} from '@chakra-ui/react';
import LikeButton from '../buttons/LikeButton';

export default function FeedCard() {
  return (
    <Center py={6}>
      <Box
        maxW={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={3}
        overflow={'hidden'}
      >
        <Stack direction={'row'} ml={1} mb={3} spacing={4} align={'center'}>
          <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021</Text>
          </Stack>
        </Stack>

        <Box h={'400px'} bg={'gray.100'} mx={-4} mb={4} pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            alt="Example"
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Placeholder Title
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          </Text>
        </Stack>

        <HStack mt={3} display='flex' justifyContent='space-evenly'>
            <LikeButton />
            <Button padding='24px 150px'>See Recipe</Button>
        </HStack>
      </Box>
    </Center>
  );
}
