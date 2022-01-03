import React, { useEffect } from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import WPAPI from 'wpapi';
import $ from 'jquery';

function JwtTestPage() {
  const RESTROOT = 'http://localhost:10016/wp-json';
  const wp = new WPAPI({ endpoint: RESTROOT });

  wp.login = wp.registerRoute('jwt-auth/v1', '/token', {});

  const username = 'cgteam';
  const password = 'pass1234';
  let token = '';

  useEffect(() => {
    const getJWTFromWp = async () => {
      await wp
        .login()
        .create(`username=${username}&password=${password}`, (err, res) => {
          // do your stuff
          console.log('AUTH TOKEN: ', res.token);
          // console.log('AUTH RESULT: ', res);
          sessionStorage.setItem('wpJWTToken', JSON.stringify(res));

          token = res.token;

          //==================
          // THIS WORKS
          // $.ajax({
          //   url: RESTROOT + '/wp/v2/posts/',
          //   method: 'POST',
          //   beforeSend: (xhr) => {
          //     xhr.setRequestHeader('Authorization', 'Bearer ' + res.token);
          //   },
          //   data: {
          //     title: 'JWT Post Title 2',
          //   },
          // });
          //==================

          // THIS ALSO WORKS
          // wp.posts()
          //   .setHeaders({
          //     Authorization: 'Bearer ' + token,
          //   })
          //   .create({
          //     title: 'JWT Post Title 2',
          //     content: 'JWT Your post content',
          //     status: 'publish',
          //   })
          //   .then(function (response) {
          //     console.log(response.id);
          //   });
        });
    };

    getJWTFromWp();
  }, []);

  // const token = JSON.parse(sessionStorage.getItem('wpJWTToken'));
  console.log('Var Token: ', token);

  // Specify a single header to send with the outgoing request
  // wp.posts()
  //   .setHeaders({
  //     POST: '/resource HTTP/1.1',
  //     Host: 'localhost:10016',
  //     Authorization: 'Bearer ' + token,
  //   })
  //   .create({
  //     title: 'JWT Post Title',
  //     content: 'JWT Your post content',
  //     status: 'publish',
  //   })
  //   .then(function (response) {
  //     console.log(response.id);
  //   });

  // wp.myCustomResource = wp.registerRoute('jwt-auth/v1', '/token', {
  //   methods: 'POST',
  //   params: ['username', 'password'],
  // });

  // wp.myCustomResource()
  //   .username('cgteam')
  //   .password('pass1234')
  //   .then((res) => console.log(res))
  //   .catch((err) => console.error(err));

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>JWT Auth Test</h1>
            <h4>NODE-WP-API</h4>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default JwtTestPage;
