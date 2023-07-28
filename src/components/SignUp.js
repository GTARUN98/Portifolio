import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import shit from "../../Assets/shit.png"

function SignUp() {
  document.title = "Home | USELESS"
//   const link = document.createElement("link");
// link.rel = "icon";
// link.href = "../../Assets/shit.png";
// document.head.appendChild(link);
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        
      </Container>

    </section>
  );
}

export default SignUp;