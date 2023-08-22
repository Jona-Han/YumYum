import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import LoadingWrapper from '../components/LoadingWrapper';

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
export default function Auth0ProviderLayout() {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <LoadingWrapper>
        <Outlet />
      </LoadingWrapper>
    </Auth0Provider>
  );
}
