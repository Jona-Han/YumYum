import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Form from './pages/Form';
import FeedLayout from './layouts/FeedLayout';
import Feed from './pages/Feed';

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
      <>
        <Route index element={<h1>Check for login</h1>} />
        <Route path="/home" element={<FeedLayout />}>
          <Route index element={<Feed />} />
        </Route>
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<div> 404 Not Found </div>} />
      </>
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
