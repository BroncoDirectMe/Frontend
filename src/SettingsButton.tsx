import React from "react";

interface Props
{
    height: string;
    width: string;
    onClick: () => void;
}

const Button: React.FC<Props> =
({
    height,
    width,
    onClick,
}) => {
    return(
        <button 
            onClick={onClick}
            style={{
                height,
                width
            }}
        >
        </button>
    );
}

export default Button;