import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from './Client'; // Import the client instance

import imageUrlBuilder from '@sanity/image-url';
import { Container, Row, Col } from 'react-bootstrap';

const builder = imageUrlBuilder(client); // Use the client instance in the imageUrlBuilder function

function urlFor(source) {
  return builder.image(source);
}

function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

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

  const handleSubmit = async e => {
    e.preventDefault();
    const newComment = { name, email, comment };
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
    const patch = client.transaction().patch(mutation, params).commit();
    const updatedPost = await patch(newComment);

    setPost(updatedPost);
    setName('');
    setEmail('');
    setComment('');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5 bg-dark text-light" style={{width:"75%"}}>
      <Row className="justify-content-center" style={{width:"100%"}}>
        <Col md={6} style={{minWidth:"80%"}}> 
          <img src={urlFor(post.image).width(950).height(400).url()} alt={post.title} className="img-fluid mb-3" />
          <p style={{minWidth:"80%"}}>{post.description}</p>
          {post.body.map(block => {
            if (block._type === 'block') {
              return (
                <p key={block._key} className={`mb-3 ${block.markDefs.some(mark => mark._type === 'strong') ? 'fw-bold' : 'fw-normal'}`} style={{minWidth:"80%"}}>
                  {block.children.map(child => child.text).join('')}
                </p>
              );
            } else if (block._type === 'image') {
              return (
                <div key={block._key} className="mb-3" style={{minWidth:"80%"}}>
                  <img src={urlFor(block.imageUrl).width(250).url()} alt={block.alt} className="img-fluid" />
                  {block.caption && <p className="fst-italic text-center">{block.caption}</p>}
                </div>
              );
            }
            return null;
          })}
          <p className="mb-3" style={{minWidth:"80%"}}>Published On : {new Date(post.publishedDate).toLocaleDateString()}</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} style={{minWidth:"80%"}}>
          <h3 className="mb-4">Comments</h3>
          {post.comments && post.comments.map((comment, index) => (
            <div key={index} className="mb-3">
              <p className="fw-bold">{comment.name}</p>
              <p className="fst-italic">{comment.email}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea className="form-control" id="comment" rows="3" value={comment} onChange={e => setComment(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div id="disqus_thread"></div>
          <script dangerouslySetInnerHTML={{
            __html: `
            var disqus_config = function () {
              this.page.url = window.location.href;
              this.page.identifier = '${post._id}';
            };
            (function() {
              var d = document, s = d.createElement('script');
              s.src = 'https://example.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
            })();
            `
          }}></script>
        </Col>
      </Row>
    </Container>
  );
}

export default SinglePost;