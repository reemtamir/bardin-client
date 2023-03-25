import '../src/styles/main.scss';
import '../src/styles/home.scss';
import '../src/styles/sign-in.scss';
import '../src/styles/sign-up.scss';
import '../src/styles/your-profile.scss';
import '../src/styles/main-room.scss';
import '../src/styles/footer.scss';
import '../src/styles/vip-req-list.scss';
import '../src/styles/admin-page.scss';

import socketIO from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket = socketIO.connect('http://localhost:3001');
function App() {
  const { favoriteUsers, removeFromFavoritesById, isAdmin, user } = useAuth();

  return (
    <>
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
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
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
                    users={favoriteUsers}
                    str={'bi bi-star-fill'}
                    fn={removeFromFavoritesById}
                  />
                </div>
              </FavoritesPrivateRout>
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
      </div>
      <div className="space"></div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
