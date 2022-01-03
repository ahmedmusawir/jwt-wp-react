import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import parse from 'html-react-parser';
import $ from 'jquery';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const history = useHistory();

  // THIS THE TEST WORDPRESS INSTALL IN LOCAL
  const RESTROOT = 'http://localhost:10016/wp-json';

  // useEffect(() => {
  //   // const contentBox = $('.content');
  //   // contentBox.css('border', '1rem dotted yellow');
  // }, []);

  const getToken = async () => {
    await $.ajax({
      url: RESTROOT + '/jwt-auth/v1/token',
      method: 'POST',
      data: {
        username: userName,
        password: userPass,
      },
    })
      .done((res) => {
        console.log(res);
        sessionStorage.setItem('wpAuthInfo', JSON.stringify(res));
        // history.push('/profile');
        window.location = '/profile';
      })
      .fail((res) => {
        console.log('REACT JWT Auth Error:', res.responseJSON);
        setLoginError(res.responseJSON.message);
      });
  };

  const handleLogin = () => {
    console.log('User Name:', userName);
    console.log('User PassWord:', userPass);

    getToken();
  };

  return (
    <Page wide={true} pageTitle="Login Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>React WP & JWT Authentication</h1>
          </Content>
        </Col>
        <Col sm={12}>
          <Content width="w-100" cssClassNames="p-5 bg-light mt-2">
            <input
              className="form-control mb-2"
              name="username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              name="userpass"
              type="text"
              onChange={(e) => setUserPass(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            {loginError && (
              <div className="text-center alert alert-danger mt-3">
                {parse(loginError)}
              </div>
            )}
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default LoginPage;
