import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "./Client"; // Import the client instance
import { CopyToClipboard } from "react-copy-to-clipboard";
import imageUrlBuilder from "@sanity/image-url";
import { Container, Row, Col } from "react-bootstrap";

const builder = imageUrlBuilder(client); // Use the client instance in the imageUrlBuilder function

function urlFor(source) {
  return builder.image(source);
}

function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const { language, code } = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    const query = `*[_type == "post" && slug.current == $slug]{
      _id,
      meta_title,
      title,
      publishedDate,
      "image": image.asset->url,
      "caption": image.caption,
      description,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "imageUrl": asset->url
        }
      },
      comments[]{
        name,
        email,
        comment
      }
    }[0]`;
    const params = { slug };
    // Use the imported client instance instead of creating a new one
    const fetchPost = async () => {
      const result = await client.fetch(query, params);
      setPost(result);
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = post.meta_title;
    }
  }, [post]);

  const patch = async (newComment) => {
    const mutation = `patch id($id:ID!) {
      patch(id: $id) {
        setIfMissing(comments, [])
        comments[] {
          name,
          email,
          comment
        } 
        -> 
        comments[] {
          ...
        }
      }
    }`;
    const params = { id: post._id };
    const result = await client.transaction().patch(mutation, params).commit();
    return result;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newComment = { name, email, comment };
  //   const updatedPost = await patch(newComment);

  //   setPost(updatedPost);
  //   setName("");
  //   setEmail("");
  //   setComment("");
  // };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      className="mt-5 bg-dark text-light"
      style={{ width: "85%", paddingBottom: "100px" }}
    >
      <Row className="justify-content-center" style={{ width: "100%" }}>
        <Col md={6} style={{ minWidth: "90%" }}>
          {/* <div style={{ padding: "15px", fontSize: "3rem" }}>{post.title}</div>
          <div style={{ width: "1200px", height: "400px", overflow: "hidden" }}>
            <img
              src={urlFor(post.image).width(1200).height(400).url()}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div> */}

         

          {/* <p style={{ minWidth: "80%" }}>{post.description}</p> */}
          {post.body.map((block) => {
            if (block._type === "block") {
              // const isBold = block.markDefs.some((mark) => mark._type === "strong");
              const isBold = block.style === "h3";

              // console.log("is bold is ",isBold)
              return (
                <p
                  key={block._key}
                  className="mb-3"
                  style={{
                    marginTop: isBold ? "1rem" : "0rem",
                    fontSize: isBold ? "2.5rem" : "1rem",
                    fontWeight: isBold ? "bold" : "normal",
                    textAlign: "left",
                  }}
                >
                  {block.children.map((child) => child.text).join("")}
                </p>
              );
            } else if (block._type === "image") {
              return (
                <div
                  key={block._key}
                  className="mb-3"
                  style={{ minWidth: "100%" }}
                >
                  <img
                    src={urlFor(block.imageUrl).width(450).url()}
                    alt={block.alt}
                    className="img-fluid"
                  />
                  {block.caption && (
                    <p className="fst-italic text-center">{block.caption}</p>
                  )}
                </div>
              );
            }

            // else if(block._type === "object" ){
            else {
              console.log(
                block._type,
                "object type with language ",
                block.language
              );
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "#313131",
                    }}
                  >
                    <span style={{ marginLeft: "1rem" }}>{block.language}</span>
                    <CopyToClipboard text={block.code} onCopy={handleCopy}>
                      <div style={{ marginRight: "1rem", cursor: "pointer" }}>
                        <i className="fas fa-copy"></i>{" "}
                        {copied ? "Copied!" : "Copy"}
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div
                    key={block._key}
                    className="mb-3"
                    style={{
                      minWidth: "80%",
                      backgroundColor: "#5b565c",
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                  >
                    <pre style={{ textAlign: "left" }}>
                      <code className={`language-${block.language}`}>
                        {block.code}
                      </code>
                    </pre>
                  </div>
                </>
              );
            }
            return null;
          })}
           <p className="mb-3" style={{ minWidth: "80%", textAlign: "right" }}>
            Published On : {new Date(post.publishedDate).toLocaleDateString()}
          </p>
        </Col>
      </Row>
      {/* <Row className="justify-content-center">
        <Col md={6} style={{ minWidth: "80%" }}>
          <form onSubmit={handleSubmit} style={{ width: "50%" }}>
            <div className="mb-3 d-flex justify-content-between">
              <div style={{ width: "48%" }}>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div style={{ width: "48%" }}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Comment
            </button>
          </form>
          <div className="mt-5">
            
            
          </div>
        </Col>
      </Row> */}
    </Container>
  );
}

export default SinglePost;
