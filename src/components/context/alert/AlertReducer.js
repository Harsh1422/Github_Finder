const AlertReducer =(state,action)=>
{
    switch(action.type)
    {
        case "Set_Alert":
            return action.payload;
        case "Remove_Alert":
            return null
        default:
            return state
    }

}
export default AlertReducer;