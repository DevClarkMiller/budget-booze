const outputErrors = (err) =>{
    if(err.response){
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers);
    }else{
        console.error(err);
    }
    
}

export default outputErrors;