 const refreshReducer = (state,action) =>{

    if(action.type == 'refresh app'){
        return {
            refresh : (prev)=> !prev
        }
    }
 }

 export default refreshReducer;