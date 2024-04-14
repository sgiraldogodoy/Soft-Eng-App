import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-x61j30sgxmn7t3u3.us.auth0.com"
      clientId="a07mB0uQsSJDFjtRqBX7nNAzbDkWmUY5"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-x61j30sgxmn7t3u3.us.auth0.com/api/v2/",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
