import { useState } from "react"
import { login, signup } from "../../services"
import { useNavigate } from "react-router-dom"

function Login() {
    const [tab, setTab] = useState(1)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const data = {
            username,
            password     
        }
        let res
        try {
            if(tab === 1){
                res = await login(data)
                localStorage.setItem('token', res.data.token)
                navigate('/chat')
            }else {
                res = await signup(data)
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login">
            <div className="login-box">
                <div className="login-image">
                    <img src="https://computer-talk.com/images/default-source/animations/4-pillar-blog-process-orchestration-image.png?sfvrsn=e3f588d8_1" alt="img-login"></img>
                </div>
                <div className="login-form">
                    <div className="login-tab">
                        <div className={`login-tab__login ${tab === 1 ? "login-tab__active" : ""}`} onClick={() => setTab(1)}>Login</div>
                        <div className={`login-tab__signup ${tab === 2 ? "login-tab__active" : ""}`} onClick={() => setTab(2)}>Signup</div>
                    </div>

                    <form className="form" onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <img src="/images/user.svg" alt="user"></img>
                            <input
                                className="input"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <img src="/images/key.svg" alt="key"></img>
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <button className="form-button">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login