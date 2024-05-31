import api from "../api";
import outputErrors from "../outputErrors";
import checkResponseStatus from "../checkResponseStatus";

const fetchGet = async (location) =>{
    try{
        const response = await api.get(location);
        checkResponseStatus(response);
        return response.data;
    }catch(err){
        outputErrors(err);
    }
}


export {fetchGet}