import { Children } from "react";

const CardArray = ({children}) => {
    return (
        <ul className="w-full row-flex-center gap-5 flex-wrap">
            {Children.map(children, (child, index) => (
                <li className="card">{child}</li>
            ))}
        </ul>
    );
}

export default CardArray
