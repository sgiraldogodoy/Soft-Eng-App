import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain="dev-x61j30sgxmn7t3u3.us.auth0.com"
    clientId="a07mB0uQsSJDFjtRqBX7nNAzbDkWmUY5"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>,
);
