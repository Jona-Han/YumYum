import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from '../components/PageLoader';

export default function LoadingWrapper({ children }: any) {
  const { isLoading } = useAuth0();

  return isLoading ? <PageLoader /> : <>{children}</>;
}
