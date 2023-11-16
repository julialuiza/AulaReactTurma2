import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { useEffect, useState } from "react";
import { Logout, User } from "../../services/login.service";
import { useNavigate } from "react-router-dom";
export default function CustomNavBar() {
  const [user, SetUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage !== undefined && userLocalStorage !== null) {
      SetUser(JSON.parse(userLocalStorage));
    }
  }, []);

  async function LogoutUser() {
    localStorage.clear();
    await Logout();
    navigate("/login");
  }

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

          {user === undefined ? null : (
            <div>
              <Nav.Link onClick={() => LogoutUser()}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Nav.Link>
              <Nav style={{ margin: "0 auto" }}>User: {user?.email}</Nav>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
