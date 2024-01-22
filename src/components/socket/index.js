import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const [socketStatus, setSocketStatus] = useState('idle')
    const socketRef = useRef();
    useEffect(() => {
        const socketClient = io('http://localhost:8080');
        socketRef.current = socketClient
        socketRef.current.on("connect", () => {
            setSocketStatus('connected');
        });

        socketRef.current.on("disconnect", () => {
            setSocketStatus('disconnected');
        });

        socketRef.current.on('reconnect', () => {
            setSocketStatus('connected');
          });
    }, [])
    console.log('socketStatus', socketStatus)

    const isConnected = socketStatus === 'connected';
    const isDisconnected = socketStatus === 'disconnected';
    return (
        <SocketContext.Provider value={{
            isConnected,
            socketRef: socketRef.current,
            isDisconnected,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}

export const useListen = (event, callback) => {
    const {isConnected, socketRef} = useSocket()
    useEffect(()=> {
        if(isConnected){
            socketRef.on(event, callback)
        }
        return () => {
            socketRef?.off(event, callback)
        }
    }, [isConnected, event, socketRef])
}

export default SocketProvider