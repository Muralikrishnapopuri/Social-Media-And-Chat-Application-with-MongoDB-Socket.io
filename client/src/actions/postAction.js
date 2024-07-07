import * as PostsApi from '../api/PostRequest';
export const getTimelinePosts = (id)=> async(dispatch)=>{
    dispatch({type: "RETREIVING_START"});
    try{
        const {data} = await PostsApi.getTimelinePosts(id);
        dispatch({type: "RETREIVING_SUCCESS", data: data});
    }catch(err){
        dispatch({type: "RETREIVING_FAIL"});
        console.log(err);
    }
}