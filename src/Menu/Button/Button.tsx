import { FC, ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
}

const Button: FC<ButtonProps> = (props) => {
    const { onClick, children } = props;

    return (
        <button className={classes.Button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
