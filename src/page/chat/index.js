import { Outlet, useNavigate } from "react-router-dom"
import React, { useContext, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { createChat, findUser, getChat, getChatOfMe } from "../../services";
import moment from "moment";
import { UserContext } from "../../App";

function Chat() {

  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate();
  const [listUser, setListuser] = useState([])
  const [listChat, setListChat] = useState([])
  const {setChatCurrent, user} = useContext(UserContext);
  console.log(user);
  const debounced = useDebouncedCallback(async (text) => {
    try {
      setIsShow(true)
      const users = await findUser({ username: text })
      setListuser(users.data)
    } catch (error) {
      console.log(error)
    }
  }, 2000);

  const handleClickChat = async (id) => {
    console.log(id);
    const chats = await getChat({
      member_id: id
    })

    if (!chats.data.length) {
      const chatCreate = await createChat({ member_id: id })
      navigate(`/chat/${chatCreate.data.id}`)
    } else {
      navigate(`/chat/${chats.data[0].id}`)
    }
    setIsShow(false)
  }

  const getChats = async () => {
    try {
      const userChat = await getChatOfMe()
      setListChat(userChat.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChat = (el) => {
    setChatCurrent(el)
    navigate(`/chat/${el.id}`)
  }

  useEffect(() => {
    getChats()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  
  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat-conversation">
          <div className="chat-search">
            <div className="chat-title">Chats</div>
            <div>
              <form>
                <div className="form-group">
                  <img src="/images/search.svg" alt="user"></img>
                  <input
                    className="input"
                    placeholder="Search"
                    onChange={(e) => debounced(e.target.value)}
                  // onBlur={() => setIsShow(false)}
                  ></input>
                </div>
              </form>
            </div>
            {
              isShow && (
                <div className="chat-result">
                  {
                    listUser.length ? listUser.map(el => (
                      <div className="chat-list__user" key={el.id} onClick={() => handleClickChat(el.id)}>
                        <div className="chat-list__user--img">
                          <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="user"></img>
                        </div>
                        <div className="chat-list__user--message">
                          <div className="chat-list__user--name">
                            {el.username}
                          </div>
                        </div>
                      </div>
                    )) : 'empty'
                  }
                </div>
              )
            }
          </div>
          <div className="chat-list">
            {
              listChat.map(el => (
                <div className="chat-list__user" key={el.id} onClick={()=> handleChat(el)}>
                  <div className="chat-list__user--img">
                    <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="user"></img>
                  </div>
                  <div className="chat-list__user--message">
                    <div className="chat-list__user--top">
                      <div className="chat-list__user--name">
                        {el.name}
                      </div>
                      <div>{moment(el.created_at, "YYYYMMDD").fromNow()}</div>
                    </div>
                    <div className="chat-list__user--content">...</div>
                  </div>
                </div>
              ))
            }
          </div>
          <div>
            <div className="chat-list__me">
              <div className="chat-list__me--img">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="user"></img>
              </div>
              <div className="chat-list__me--body">
                <div className="chat-list__me--name">
                  {user?.username}
                </div>
                <div className="chat-list__me--status">Online</div>
              </div>
              <div className="chat-list__me--logout" onClick={handleLogout}>
                <img src="/images/power.svg" alt="logout"></img>
                <div>Logout</div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat-content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>

  )
}

export default Chat