import '../src/styles/main.scss';
import { useState } from 'react';
import socketIO from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainRoom from './components/MainRoom';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="sign-in"
          element={<SignIn users={users} setUser={setUser} socket={socket} />}
        ></Route>
        <Route
          path="sign-up"
          element={<SignUp setUsers={setUsers} users={users} />}
        ></Route>
        <Route
          path="main-room"
          element={<MainRoom socket={socket} user={user} />}
        ></Route>
        {/* <Route path="/chat" element={<ChatPage socket={socket} />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
