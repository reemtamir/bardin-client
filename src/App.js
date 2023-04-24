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

import socketIO from 'socket.io-client';
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
import ChatPage from './components/ChatPage';
import ShowUsers from './components/ShowUsers';
import SignUpAdmin from './components/SignUpAdmin';
import SignInAdmin from './components/SignInAdmin';
import { useAuth } from './hooks/useAuth';
import AdminPrivateRout from './components/AdminPrivateRout';
import AdminPage from './components/AdminPage';
import AdminEditPage from './components/AdminEditPage';
import ThankYou from './components/ThankYou';
import VipReqList from './components/VipReqList';
import VipReqForm from './components/VipReqForm';
import AdminNavBar from './components/AdminNavBar';
import BlockedPrivateRout from './components/BlockedPrivateRout';
import { ToastContainer } from 'react-toastify';
import ShowBlockedUsers from './components/ShowBlockedUsers';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getRandomeColor } from './utils/randomColor';
import { Link } from 'react-router-dom';

const socket = socketIO.connect('http://localhost:3001');
function App() {
  const {
    favoriteUsers,
    removeFromFavoritesById,
    isAdmin,
    user,
    admin,
    isDark,
    setIsDark,
  } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [randomColor, setRandomeColor] = useState(getRandomeColor());
  const [vipMessage, setVipMessage] = useState('');

  const showAlert = () => {
    setVipMessage('Only for VIP members');
  };

  useEffect(() => {
    let logInTimeOutId;
    let alertTimeOut;
    let randomeColorInterval;
    const resetTimeout = () => {
      clearTimeout(logInTimeOutId);
      clearTimeout(alertTimeOut);
      clearInterval(randomeColorInterval);

      alertTimeOut = setTimeout(() => {
        setIsLoggedIn(true);
        randomeColorInterval = setInterval(() => {
          setRandomeColor(getRandomeColor());
        }, 500);
        logInTimeOutId = setTimeout(() => {
          navigate('/log-out');
          setIsLoggedIn(false);
        }, 5000);
      }, 60000);
    };

    const onActivity = () => {
      resetTimeout();
      setIsLoggedIn(false);
      clearInterval(randomeColorInterval);
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
                />
              }
            ></Route>
            <Route path="sign-up" element={<SignUp />}></Route>
            <Route path="sign-up-admin" element={<SignUpAdmin />}></Route>
            <Route path="sign-in" element={<SignIn socket={socket} />}></Route>
            <Route path="log-out" element={<LogOut socket={socket} />}></Route>

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
                  <ChatPage socket={socket} />
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
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
