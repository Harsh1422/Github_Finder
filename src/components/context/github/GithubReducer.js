const githubReducer = (state, action) => {
    switch (action.type) {
        case "Get_Users":
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case "Set_Loading":
            return {
                ...state,
                loading: true,
            }
        case "Get_User":
            return{
                ...state,
                user:action.payload,
                loading:false,
            }
        case "Get_User_Repos":
            return{
                ...state,
                repos:action.payload,
                loading:false,
            }
        case "Clear_Search":

            return {
                ...state,
                users: [],
            }
        default:
            return state;
    }
}
export default githubReducer;