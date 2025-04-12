import { createContext, useContext, useReducer } from "react";
import profilePic from '/profilPic.png'
const AuthContext = createContext();

const initialState = {
    user:null,
    isAuth:false,
}

const FAKE_USER = {
    name: "Mohamed",
    email: "jack@example.com",
    password: "qwerty",
    avatar: profilePic,
  };

function reducer(state,action) {
    switch(action.type){
        case 'login':

        return {
            ...state,
            user:action.payload,
            isAuth:true,
        }
        case 'logout':
            return {
                ...state,
                user:null,
                isAuth:false,
            }
        default:
            throw new Error("Unknown action type")
    }
}
function AuthProvider({ children }) {
    const [{user,isAuth},dispatch] = useReducer(reducer, initialState);

    function login(email,password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type:'login',payload:FAKE_USER})
        }else{
            throw new Error("Invalid credentials")
        }

    }

    function logout(){
        dispatch({type:'logout'})
    }

    return (
        <AuthContext.Provider value={{user,isAuth,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
} 

export { useAuth, AuthProvider };