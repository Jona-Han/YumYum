import { withAuthenticationRequired } from '@auth0/auth0-react';
import PageLoader from './PageLoader';

export default function AuthenticationGuard({ children }: any) {
  const ProtectedComponent = withAuthenticationRequired(children, {
    onRedirecting: () => (
      <div>
        <PageLoader />
      </div>
    ),
  });

  return <ProtectedComponent />;
}
