import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

// interface LayoutProps {
//   children: React.ReactNode;
// }

export default function FeedLayout() {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(6, 1fr)' }} bg="gray.50">
      <GridItem as="aside" colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem as="main" colSpan={5}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </GridItem>
    </Grid>
  );
}
