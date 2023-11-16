import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { useEffect, useState } from "react";
import { User } from "../../services/login.service";
export default function CustomNavBar() {
  const [user, SetUser] = useState<User>();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage !== undefined && userLocalStorage !== null) {
      SetUser(JSON.parse(userLocalStorage));
    }
  }, []);

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img src={Logo} width={40} />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/produtos">Produtos</Nav.Link>
          </Nav>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Nav.Link>

          <Nav style={{ margin: "0 auto" }}>User: {user?.email}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
