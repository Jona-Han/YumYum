import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FeedLayout() {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(7, 1fr)' }} bg="gray.50">
      <GridItem as="aside" colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem as="main" colSpan={6}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </GridItem>
    </Grid>
  );
}
