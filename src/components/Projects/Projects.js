import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/leaf.png";
import emotion from "../../Assets/emotion.png";
import editor from "../../Assets/codeEditor.png";
import chatify from "../../Assets/chatify.png";
import suicide from "../../Assets/suicide.png";
import bitsOfCode from "../../Assets/blog.png";

import Typing from "../../Assets/Typing.png"
import OpenSource from "../../Assets/OpenSource.png"
import MintNFT from "../../Assets/MintNFT.png"

// const MintNFT = "https://drive.google.com/file/d/1_-cVwyOZudqkhy8GbvK-6Lu2PEXUhTlI/view?usp=sharing";
// const OpenSource = "https://drive.google.com/file/d/1YPs1qp-MrJYx7u-TJ18NugksNUdi0zNn/view?usp=sharing"
// const Typing = "https://drive.google.com/file/d/1wmSZqFU7XUoe5nfjBMwKC6QEQXka4ekA/view?usp=sharing"

function Projects() {

  document.title = "Projects | USELESS"
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={OpenSource}
              isBlog={false}
              title="Open Source Repository"
              description="This is a MERN stack application that allows users to upload and store code on IPFS and blockchain, with secure authentication and authorization using cookies, JWT, bcrypt, and Multer middleware. The app also enables users to view their transactions and created blocks."
              ghLink="https://github.com/GTARUN98/Open_Source_Repository"
              // demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Typing}
              isBlog={false}
              title="Typing Practice"
              description="This is a MERN stack app for typing practice with real-time accuracy and WPM calculation. It also features secure login, registration, and profile sections, and is built with React Router DOM, Material-UI, and other packages."
              ghLink="https://github.com/GTARUN98/Typing_Website"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={MintNFT}
              isBlog={false}
              title="Mint NFT"
              description="This is a Hardhat project with a sample contract, test, and deployment script. It uses OpenZeppelin to mint NFTs and Pinata to store metadata."
              ghLink="https://github.com/GTARUN98/Mint_NFT"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          {/*<Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          { <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
