import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getChatOfMe, getMe } from './services';
import event from 'events'
import { useSocket } from './components/socket';
export const UserContext = createContext();

export const emitter = new event.EventEmitter()

function App() {
  const [user, setUser] = useState(null);
  const [chatCurrent, setChatCurrent] = useState(null);
  const navigate = useNavigate();
  const { isConnected, socketRef } = useSocket()

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getMe()
      setUser(userInfo.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getChats = async () => {
    try {
      const userChat = await getChatOfMe()
      if (isConnected) {
        userChat.data.forEach(el => {
          socketRef.emit('join_chat', el.id)
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])


  useEffect(() => {
    getChats()
  }, [isConnected])

  emitter.on('unauthorized', () => {
    navigate('/login')
  })
  return (
    <UserContext.Provider value={{
      user: user,
      chat_current: chatCurrent,
      setChatCurrent
    }}>
      <div className="app">
        <div className='header'>
          Redis chat demo
        </div>
        <div className='container'>
          <Outlet></Outlet>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
