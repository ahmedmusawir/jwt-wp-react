import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNavbar from './components/general/MainNavbar';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import './App.scss';
import Logout from './components/Logout';
import JwtTestPage from './pages/JwtTestPage';

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const wpAuthInfo = JSON.parse(sessionStorage.getItem('wpAuthInfo'));
      // console.log('Auth Info: ', wpAuthInfo);
      if (wpAuthInfo.token) {
        setUserName(wpAuthInfo.user_display_name);
      }
    } catch (error) {}
  }, []);

  return (
    <BrowserRouter>
      <MainNavbar userName={userName} />
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/profile">
            <UserProfilePage userName={userName} />
          </Route>
          <Route exact path="/jwt-test">
            <JwtTestPage />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

App.propTypes = {};

export default App;
