import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Form from './pages/Form';
import FeedLayout from './layouts/FeedLayout';
import Feed from './components/Feed';
import Auth0ProviderLayout from './layouts/Auth0ProviderLayout';
import Profile from './pages/Profile';
import AuthenticationGuard from './components/AuthenticationGuard';

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
        {/* <Route index element={<h1>Check for login</h1>} /> */}
        <Route path="*" element={<div> 404 Not Found </div>} />
        <Route element={<FeedLayout />}>
          <Route index element={<Feed />} />
        </Route>
        <Route path="/form" element={<Form />} />
        {/* <Route path="/callback" element={<FeedLayout />}>
          <Route element={<CallbackPage />} />
        </Route> */}
        <Route path="/profile" element={<AuthenticationGuard component={Profile} />} />
        {/* <Route path="/protected" element={<ProtectedPage />} /> */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
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
