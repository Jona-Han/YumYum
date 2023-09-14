import { withAuthenticationRequired } from '@auth0/auth0-react';
import PageLoader from './PageLoader';

export default function AuthenticationGuard({ component }: any) {
  const ProtectedComponent = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <PageLoader />
      </div>
    ),
  });

  return <ProtectedComponent />;
}
