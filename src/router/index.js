import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/login";
import Chat from "../page/chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/login",
                element: <Login></Login>  
            },
            {
                path: "/chat",
                element: <Chat></Chat>  
            }
        ]
    }
]);

export default router