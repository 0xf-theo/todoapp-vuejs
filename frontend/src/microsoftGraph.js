// file src/lib/microsoftGraph.js
import * as msal from "@azure/msal-browser";

/**
 * List the requested scopes (aka. the requested permissions)
 */
const requestedScopes = {
  scopes: ["User.Read"],
};

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: "e8137439-4d1d-462d-a85f-f81cfea8f0d8",
    redirectUri: "/",
  },
});

export async function signInAndGetUser() {
  await msalInstance.initialize();
  const authResult = await msalInstance.loginPopup(requestedScopes);
  msalInstance.setActiveAccount(authResult.account);
  console.log({ authResult });
  return authResult;
}
