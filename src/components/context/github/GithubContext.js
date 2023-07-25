import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();
const Github_Url = process.env.REACT_APP_GITHUB_URL;
const Github_Token = process.env.REACT_APP_GITHUB_TOKEN;
export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
        loading: false
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);
    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${Github_Url}/search/users?${params}`, {
            Authorization: `token ${Github_Token}`
        })
        const { items } = await response.json();
        dispatch({
            type: "Get_Users",
            payload: items,
        })
    }
    const  getUserRepos= async(login)=>
    {
        const params = new URLSearchParams({
            sort: "created",
            per_page:10,
        })
        setLoading();
        
        const response = await fetch(`${Github_Url}/users/${login}/repos?${params}`,{
            Authorization: `token ${Github_Token}`
        })
        if(response.status=== 404)
        {
            window.location="/notfound";
        }
        const data= await response.json();
        dispatch({
            type:"Get_User_Repos",
            payload:data,
        })
        
    }
    const  getUser= async(login)=>
    {
        setLoading();
        
        const response = await fetch(`${Github_Url}/users/${login}`,{
            Authorization: `token ${Github_Token}`
        })
        if(response.status=== 404)
        {
            window.location="/notfound";
        }
        const data= await response.json();
        dispatch({
            type:"Get_User",
            payload:data,
        })
        
    }
    const clearSearch = () => {
        dispatch({
            type: "Clear_Search",
        })
    }
    const setLoading = () => {
        dispatch({
            type: "Set_Loading"
        })
    }
    return <GithubContext.Provider value={{
        ...state,
        getUserRepos,
        getUser,
        searchUsers,
        clearSearch
    }}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext