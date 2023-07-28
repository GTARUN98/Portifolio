import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
AiFillGithub
} from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaReddit } from "react-icons/fa";

function Footer() {
let date = new Date();
let year = date.getFullYear();
return (
<footer className="footer fixed-bottom w-100 py-3">
<Container fluid>
<Row>
<Col md="4" className="text-center text-md-left">
<h3>Designed and Developed by Garlapati Tarun</h3>
</Col>
<Col md="4" className="text-center">
<h3>Copyright © {year}</h3>
</Col>
<Col md="4" className="text-center text-md-right">
<ul className="footer-icons mb-0">
<li className="social-icons">
<a href="mailto:tarun98@workmail.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}
>
<FiMail />
</a>
</li>
<li className="social-icons">
<a
href="https://github.com/GTARUN98"
style={{ color: "white" }}
target="_blank"
rel="noopener noreferrer"
>
<AiFillGithub />
</a>
</li>
<li className="social-icons">
<a
href="https://www.reddit.com/user/VegetableProperty967"
style={{ color: "white" }}
target="_blank"
rel="noopener noreferrer"
>
<FaReddit />
</a>
</li>
<li className="social-icons">
<a
href="https://www.linkedin.com/in/tarun-garlapati"
style={{ color: "white" }}
target="_blank"
rel="noopener noreferrer"
>
<FaLinkedinIn />
</a>
</li>
{/* <li className="social-icons">
<a
href="https://www.instagram.com/soumyajit4419"
style={{ color: "white" }}
target="_blank"
rel="noopener noreferrer"
>
<AiFillInstagram />
</a>
</li> */}
</ul>
</Col>
</Row>
</Container>
</footer>
);
}

export default Footer;