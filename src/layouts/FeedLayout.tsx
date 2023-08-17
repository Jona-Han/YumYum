import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

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
