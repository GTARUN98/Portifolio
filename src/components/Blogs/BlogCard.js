import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

import { Link } from 'react-router-dom';

function BlogCard(props) {
  return (
    <Card className="project-card-view" style={{margin:"0px"}}>
  {/* <Card.Img variant="top" src={props.imgSrc} style={{height:"150px"}}alt="card-img" /> */}
  <Card.Body className="text-left">
    <Card.Title style={{ textAlign: "justify", marginBottom: "13px" }}>
      {props.title}
    </Card.Title>
    <Card.Text style={{ textAlign: "justify" }}>
      {props.publishedDate}
    </Card.Text>
    <Button
      variant="primary"
      target="_blank"
      style={{ textAlign: "justify",width:"120px" }}
      
      className="d-flex justify-content-start"
    >
      <Link
        to={`/blog/${props.blogLink}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        Read Blog
      </Link>
    </Button>
  </Card.Body>
</Card>
  );
}
export default BlogCard;