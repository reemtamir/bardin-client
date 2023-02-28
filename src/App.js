import '../src/styles/main.scss';
import '../src/styles/home.scss';
import '../src/styles/sign-in.scss';
import '../src/styles/sign-up.scss';
import '../src/styles/main-room.scss';
import '../src/styles/your-profile.scss';

import socketIO from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainRoom from './components/MainRoom';
import YourProfile from './components/YourProfile';
import PrivateRout from './components/PrivateRout';
import LogOut from './components/LogOut';
import DeleteProfile from './components/DeleteProfile';
import ChatPage from './components/ChatPage';

const socket = socketIO.connect('http://localhost:3000');

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="sign-up" element={<SignUp />}></Route>
          <Route path="sign-in" element={<SignIn socket={socket} />}></Route>
          <Route path="log-out" element={<LogOut socket={socket} />}></Route>
          <Route
            path="chat-room"
            element={
              <PrivateRout>
                <ChatPage socket={socket} />
              </PrivateRout>
            }
          ></Route>
          <Route
            path="me/:email"
            element={
              <PrivateRout>
                <YourProfile />
              </PrivateRout>
            }
          ></Route>
          <Route
            path="delete/:email"
            element={
              <PrivateRout>
                <DeleteProfile />
              </PrivateRout>
            }
          ></Route>
        </Routes>
      </div>
      <div className="space"></div>

      <div>FOOTER</div>
    </>
  );
}

export default App;
