import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { createMessage, getChatDetail, getMessages } from "../../services";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useListen } from "../../components/socket";

function Conversation() {
    const { chat_current, user, setChatCurrent } = useContext(UserContext);
    const [text, setText] = useState('')
    const [listMessage, setListMessage] = useState([])
    const params = useParams()

    const fetchChatDetail = async () =>{
        const detailChat =  await getChatDetail(params.chat_id)
        console.log('detailChat', detailChat);
        setChatCurrent(detailChat?.data)
    }

    useEffect(()=> {
        fetchChatDetail()
    },[])

    const handleClickSubmit = async (e) => {
        try {
            e.preventDefault()
            const newMessage = await createMessage({ content: text, chat_id: params.chat_id })
            setText('')
            setListMessage([
                ...listMessage,
                newMessage.data
            ])
        } catch (error) {
            console.log(error);
        }
    }

    const fetchListMessage = async () => {
        try {
            const messages = await getMessages(params.chat_id)
            setListMessage(messages.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchListMessage()
    }, [])
    
    const handlRenderMessage = (message) => {
        console.log('message', message);
        setListMessage(prev => [...prev, message])
    }
    
    useListen('message',handlRenderMessage)

    return (
        <div className="conversation">
            <div className="conversation-header">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="avatar"></img>
                <div>{chat_current?.name}</div>
            </div>
            <div className="conversation-body">
                <div className="conversation-body-list">
                    {
                        listMessage.map(el => (
                            <div className={`conversation-body-item ${el.sender_id === user?.id ? 'conversation-body-me' : ''}`} key={el.id}>
                                <div className={`conversation-body-content ${el.sender_id === user?.id ? 'conversation-body-content-me' : ''}`}>
                                    {el.content}
                                </div>
                                <div className={`conversation-body-time`}>
                                    <img src="/images/clock.svg" alt="clock"></img>
                                    <span>{moment(el.created_at).format('YYYY-MM-DD hh:mm:ss')}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="conversation-footer">
                <form className="conversation-form" onSubmit={handleClickSubmit}>
                    <input className="form-input" value={text} onChange={(e) => setText(e.target.value)}></input>
                    <button className="form-button" type="submit">
                        <div>Send</div>
                        <img src="/images/send.svg" alt="send"></img>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Conversation