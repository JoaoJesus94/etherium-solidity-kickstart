import { Container } from "semantic-ui-react";
import Header from "./header";

const Layout = ({ children }) => (
  <Container>
    <Header />
    <main>{children}</main>
  </Container>
);

export default Layout;
