import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "./BlogCard";
import Particle from "../Particle";
import { createClient } from "next-sanity";
import { Link } from "react-router-dom";
import client from "../Client";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Blogs | USELESS";
    const query = `*[_type == "post"]{
      _id,
      title,
      publishedDate,
      description,
      slug
    }`;
    client.fetch(query).then((posts) => {
      setPosts(posts);
    });
  }, []);

  console.log("date is", posts.publishedDate);

  return (
    <Container
      fluid
      className="project-section"
      style={{ marginTop: "-1 rem" }}
    >
      {/* <Particle /> */}
      <Container style={{ marginTop: "-1 rem" }}>
        <h1 className="project-heading" style={{ marginTop: "-5rem" }}>
          My Recent <strong className="purple">Works ({posts.length})</strong>
        </h1>
        <p style={{ color: "white", marginTop: "2px" }}>
          Here are a few Blogs I&apos;ve written recently.
        </p>
        {posts &&
          posts.map((post) => (
            <Row
              key={post._id}
              className="mb-0"
              style={{
                justifyContent: "center",
                marginTop: "-2rem",
              }}
            >
              <Col md={12} className="project-card">
                <BlogCard
                  isBlog={true}
                  title={post.title}
                  publishedDate={post.publishedDate.slice(0, 10)}
                  description={post.description}
                  blogLink={`${post.slug.current}`}
                />
              </Col>
            </Row>
          ))}
      </Container>
    </Container>
  );
}

export default Blog;
