import React from 'react';

type ButtonType = {
    onClick: () => void,
};

const Button: React.FC<ButtonType> = ({children, onClick}) => {
    return (
        <button onClick={onClick}>{children}</button>
    );
}

export default Button;
