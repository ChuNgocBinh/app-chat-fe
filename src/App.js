import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getMe } from './services';
import event from 'events'
export const UserContext = createContext();

export const emitter = new event.EventEmitter()

function App() {
  const [user, setUser] = useState(null);
  const [chatCurrent, setChatCurrent] = useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getMe()
      setUser(userInfo.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])

  emitter.on('unauthorized', ()=> {
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
