import { Container } from "semantic-ui-react";
import Header from "./Header";

const Layout = ({ children }) => (
  <Container>
    <Header />
    <main>{children}</main>
  </Container>
);

export default Layout;
