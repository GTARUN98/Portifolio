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
    document.title = "Blogs | USELESS"
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

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ marginTop: "0px" }}>
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white", marginTop: "20px" }}>
          Here are a few Blogs I&apos;ve written recently.
        </p>
        {posts &&
          posts.map((post) => (
            <Row
              key={post._id}
              style={{
                justifyContent: "center",
                paddingBottom: "10px",
                marginTop: "30px",
              }}
            >
              <Col md={12} className="project-card">
                <BlogCard
                  isBlog={true}
                  title={post.title}
                  publishedDate={post.publishedDate}
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