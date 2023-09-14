import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Form from './pages/Form';
import FeedLayout from './layouts/FeedLayout';
import Feed from './components/feed/Feed';
import Auth0ProviderLayout from './layouts/Auth0ProviderLayout';
import Profile from './pages/Profile';
import AuthenticationGuard from './components/AuthenticationGuard';
import Error from './pages/Error';
import Settings from './pages/Settings';
import Explore from './pages/Explore';
import Trending from './pages/Trending';
import Favorites from './pages/Favorites';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Auth0ProviderLayout />}>
        <Route path="*" element={<Error />} />
        <Route element={<FeedLayout />}>
          <Route index element={<Feed />} />
        </Route>
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<AuthenticationGuard component={Profile} />} />
        <Route path="/settings" element={<AuthenticationGuard component={Settings} />} />
        <Route path="/explore" element={<AuthenticationGuard component={Explore} />} />
        <Route path="/trending" element={<AuthenticationGuard component={Trending} />} />
        <Route path="/favorites" element={<AuthenticationGuard component={Favorites} />} />
      </Route>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
