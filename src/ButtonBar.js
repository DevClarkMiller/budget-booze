import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";

const ButtonBar = ({ chunks }) =>{
    const navigate = useNavigate();
    const [pageNums, setPageNums] = useState([]);

    useEffect(() =>{
        console.log(chunks);
        if(chunks){
            let tempPageNums = [];
            chunks.forEach((chunk, index) =>{
                tempPageNums.push(index);
            });
            setPageNums(tempPageNums);
            console.log(tempPageNums);
        }
    }, [chunks]);
    


    return(
        <div className="buttonBar w-full p-2 flex flex-row flex-wrap gap-1">
            {
                pageNums && pageNums.map((pageNum) =>(
                    <button key={pageNum} onClick={() => navigate(`/${pageNum}`)}>{pageNum}</button>
                ))
            }
        </div>
    );
}

export default ButtonBar;