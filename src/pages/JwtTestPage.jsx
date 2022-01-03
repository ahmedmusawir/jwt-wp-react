import React, { useEffect, useState } from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import WPAPI from 'wpapi';
import $ from 'jquery';

const RESTROOT = 'http://localhost:10016/wp-json';
const wp = new WPAPI({ endpoint: RESTROOT });

wp.login = wp.registerRoute('jwt-auth/v1', '/token');

const username = 'cgteam';
const password = 'pass1234';

function JwtTestPage() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const getJWTFromWp = async () => {
      await wp
        .login()
        .create(`username=${username}&password=${password}`, (err, res) => {
          console.log('AUTH TOKEN: ', res.token);
          sessionStorage.setItem('wpJWTToken', JSON.stringify(res.token));
        });
    };

    getJWTFromWp();
  }, []);

  const handleInsert = () => {
    const token = JSON.parse(sessionStorage.getItem('wpJWTToken'));
    console.log('TOKEN IN HANDLE INSERT:', token);

    // CREATE POST WITH WPAPI AND JWT TOKEN
    wp.posts()
      .setHeaders({
        Authorization: 'Bearer ' + token,
      })
      .create({
        title,
        content: 'JWT Your post content',
        status: 'publish',
      })
      .then(function (response) {
        console.log(response.id);
      });
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>JWT Auth Test</h1>
            <h4>NODE-WP-API</h4>
          </Content>
        </Col>
        <Col sm={12}>
          <Content width="w-100" cssClassNames="p-5 bg-light mt-2">
            <input
              className="form-control mb-2"
              name="username"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />

            <button className="btn btn-primary" onClick={handleInsert}>
              Insert
            </button>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default JwtTestPage;
