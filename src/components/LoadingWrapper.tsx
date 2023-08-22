import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from './PageLoader';

export default function LoadingWrapper({ children }) {
  const { isLoading } = useAuth0();

  return isLoading ? <PageLoader /> : <>{children}</>;
}
