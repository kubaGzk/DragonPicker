import { FC, ReactNode } from "react";
import classes from "./Button.module.css";
import { useSounds } from "../../hooks/hooks";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
    const { onClick, children, disabled } = props;

    const { playClick } = useSounds();

    const clickHandler = () => {
        // playClick();
        onClick();
    };

    return (
        <button
            className={classes.Button}
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
