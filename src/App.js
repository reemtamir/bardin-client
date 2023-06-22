import '../src/styles/main.scss';
import '../src/styles/home.scss';
import '../src/styles/sign-in.scss';
import '../src/styles/sign-up.scss';
import '../src/styles/your-profile.scss';
import '../src/styles/main-room.scss';
import '../src/styles/footer.scss';
import '../src/styles/vip-req-list.scss';
import '../src/styles/admin-page.scss';
import '../src/styles/blocked.scss';
import '../src/styles/info.scss';

import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRout from './components/PrivateRout';
import Home from './components/Home';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import FavoritesPrivateRout from './components/FavoritesPrivateRout';
import YourProfile from './components/YourProfile';
import LogOut from './components/LogOut';
import DeleteProfile from './components/DeleteProfile';
import PrivateChat from './components/PrivateChat';
import ShowUsers from './components/ShowUsers';
import SignUpAdmin from './components/SignUpAdmin';
import SignInAdmin from './components/SignInAdmin';
import { useAuth } from './hooks/useAuth';
import { useApp } from './hooks/useApp';
import { useChat } from './hooks/useChat';
import AdminPrivateRout from './components/AdminPrivateRout';
import AdminPage from './components/AdminPage';
import AdminEditPage from './components/AdminEditPage';
import ThankYou from './components/ThankYou';
import VipReqList from './components/VipReqList';
import VipReqForm from './components/VipReqForm';
import AdminNavBar from './components/AdminNavBar';
import BlockedPrivateRout from './components/BlockedPrivateRout';
import ShowBlockedUsers from './components/ShowBlockedUsers';
import Information from './components/Information';
import Search from './components/Search';
import MainRoom from './components/MainRoom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getRandomColor } from './utils/randomColor';
import { Link } from 'react-router-dom';

function App() {
  const { isAdmin, user, admin, socket } = useAuth();
  const { favoriteUsers, removeFromFavoritesById, isDark, setIsDark } =
    useApp();
  const { showAlert, alert, chat, setMessageOnChat, messageOnChat, setAlert } =
    useChat();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const [vipMessage, setVipMessage] = useState('');
  const userHomePage = [
    'Welcome to Bardin app',
    'In this app you can communicate and find new people',
    `  You will be able to  sign in after registration, see who's online, send private messages and edit your account. When edit your account, you MUST fill the password and confirmed password fields.
     you won't be able to see all users. That you can do when you become VIP member.
`,
    ` As a VIP member, you also can search for users, add  users to your favorites list or block them. 
 Send a VIP req and wait until
Admin will approve it.`,
    `Good luck and enjoy`,
  ];

  const adminHomePage = [
    'Welcome Admin',
    'As admin u can sign-in after registration, see all users, see the users blocked list,  get VIP req,  delete them and update users VIP value',

    `Good luck and enjoy`,
  ];

  useEffect(() => {
    let logInTimeOutId;
    let alertTimeOut;
    let randomColorInterval;
    const resetTimeout = () => {
      clearTimeout(logInTimeOutId);
      clearTimeout(alertTimeOut);
      clearInterval(randomColorInterval);

      alertTimeOut = setTimeout(() => {
        setIsLoggedIn(true);
        randomColorInterval = setInterval(() => {
          setRandomColor(getRandomColor());
        }, 500);
        logInTimeOutId = setTimeout(() => {
          navigate('/log-out');
          setIsLoggedIn(false);
        }, 5000);
      }, 14400000);
    };

    const onActivity = () => {
      resetTimeout();
      setIsLoggedIn(false);
      clearInterval(randomColorInterval);
    };

    document.addEventListener('mousemove', onActivity);
    document.addEventListener('keydown', onActivity);

    resetTimeout();

    return () => {
      document.removeEventListener('mousemove', onActivity);
      document.removeEventListener('keydown', onActivity);
      clearTimeout(logInTimeOutId);
      clearTimeout(alertTimeOut);
    };
  }, [user, navigate]);

  return (
    <>
      <div className={isDark ? 'dark' : 'app'}>
        <i
          className={isDark ? 'bi bi-lightbulb' : 'bi bi-lightbulb-fill'}
          onClick={() => setIsDark((isDark) => !isDark)}
        ></i>

        <header>{!isAdmin && <NavBar />}</header>
        {alert && (
          <div className=" alert-div">
            {<p className="new-alert">{alert}</p>}
          </div>
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {(user || admin) && isLoggedIn && (
          <div className="disconnect-alert">
            <p style={{ color: randomColor }} className="disconnect-alert-p">
              You will be disconnected in a few seconds
            </p>
          </div>
        )}
        {!isLoggedIn && (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  img={
                    'https://logos.flamingtext.com/City-Logos/Bardin-Water-Logo.png'
                  }
                  linkLetsGoStr={'/sign-in'}
                  linkToInfo={'/user-info'}
                />
              }
            ></Route>
            <Route path="sign-up" element={<SignUp />}></Route>
            <Route
              path="user-info"
              element={
                <Information text={[...userHomePage]} linkStr={'/sign-in'} />
              }
            ></Route>
            <Route
              path="admin-info"
              element={
                <Information
                  text={[...adminHomePage]}
                  linkStr={'/sign-in-admin'}
                />
              }
            ></Route>
            <Route path="sign-up-admin" element={<SignUpAdmin />}></Route>
            <Route path="sign-in" element={<SignIn />}></Route>
            <Route path="log-out" element={<LogOut />}></Route>
            <Route path="private" element={<PrivateChat />}></Route>
            <Route path="sign-in-admin" element={<SignInAdmin />}></Route>

            <Route path="admin-page" element={<AdminPage />}></Route>

            <Route
              path="/vip-req-list"
              element={
                <AdminPrivateRout>
                  <AdminNavBar />
                  <VipReqList />
                </AdminPrivateRout>
              }
            ></Route>

            <Route
              path="/edit-users/:id"
              element={
                <AdminPrivateRout>
                  <AdminEditPage />
                </AdminPrivateRout>
              }
            ></Route>
            <Route
              path="chat-room/:id"
              element={
                <PrivateRout>
                  <div className="container">{<MainRoom />}</div>
                </PrivateRout>
              }
            ></Route>
            <Route
              path="search/:id"
              element={
                <PrivateRout>
                  <Search />
                </PrivateRout>
              }
            ></Route>
            <Route
              path="me/:id"
              element={
                <PrivateRout>
                  <YourProfile />
                </PrivateRout>
              }
            ></Route>
            <Route
              path="delete/:id"
              element={
                <PrivateRout>
                  <DeleteProfile />
                </PrivateRout>
              }
            ></Route>
            <Route
              path="favorites"
              element={
                <FavoritesPrivateRout>
                  <div className="users">
                    <ShowUsers
                      fn={removeFromFavoritesById}
                      users={favoriteUsers}
                      str={'bi bi-star-fill'}
                      blockFn={showAlert}
                    />
                    {vipMessage && (
                      <div className="vip-alert-div">
                        <div className="vip-alert-message">{vipMessage}</div>
                        <div className="vip-alert-btns-div">
                          <button
                            className="vip-alert-btn-return"
                            onClick={() => setVipMessage('')}
                          >
                            {' '}
                            Return
                          </button>
                          <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={'/vip-req-form'}
                            className=" vip-alert-btn-get-vip "
                          >
                            {' '}
                            Get vip
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </FavoritesPrivateRout>
              }
            ></Route>
            <Route
              path="blocked"
              element={
                <BlockedPrivateRout>
                  <div className="users">
                    <ShowBlockedUsers />
                  </div>
                </BlockedPrivateRout>
              }
            ></Route>

            <Route
              path="vip-req-form"
              element={
                <PrivateRout>
                  <VipReqForm />
                </PrivateRout>
              }
            ></Route>

            <Route
              path="thank-you"
              element={
                <PrivateRout>
                  <ThankYou />
                </PrivateRout>
              }
            ></Route>
          </Routes>
        )}
        <div className="space"></div>

        <Footer />
      </div>
    </>
  );
}

export default App;
