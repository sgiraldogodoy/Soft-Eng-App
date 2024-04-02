import { useAuth0 } from "@auth0/auth0-react";

export default function Test() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated && <div>Hello World</div>;
}
