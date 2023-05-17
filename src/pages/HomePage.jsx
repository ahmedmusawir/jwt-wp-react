import React, { useEffect, useState } from "react";
import Page from "../components/layouts/Page";
import { Row, Col } from "react-bootstrap";
import Content from "../components/layouts/Content";
import WPAPI from "wpapi";
import Loader from "react-loader-spinner";
import parse from "html-react-parser";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);

  // THIS THE TEST WORDPRESS INSTALL IN LOCAL
  const RESTROOT = "http://jwtwp.local/wp-json";
  const wp = new WPAPI({
    endpoint: RESTROOT,
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsPending(true);
        // Fetch posts
        const fetchedPosts = await wp.posts().get();

        // console.log(fetchedPosts);
        setPosts(fetchedPosts);
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    }

    fetchPosts();
  }, []);

  return (
    <Page wide={true} pageTitle="Home">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>Data for Non Logged In</h1>
          </Content>
        </Col>
        <Col sm={12}>
          <Content width="w-100" cssClassNames="p-5 bg-light mt-2">
            {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
            <div>
              <section className="list-group">
                {isPending && (
                  <div className="text-center">
                    <Loader
                      type="ThreeDots"
                      color="red"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                {posts &&
                  posts.map((post) => (
                    <article key={post.id} className="list-group-item">
                      {parse(post.title.rendered)}{" "}
                      <span className="badge badge-primary">
                        Post ID: {post.id}
                      </span>
                    </article>
                  ))}
              </section>
            </div>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default HomePage;
