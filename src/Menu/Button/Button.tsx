import { FC, ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
    const { onClick, children, disabled } = props;

    return (
        <button
            className={classes.Button}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
