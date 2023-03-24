import React from "react";
import classes from "./Backdrop.module.css";

interface BackdropProps {
    onClick?: () => void;
}

export const Backdrop: React.FC<BackdropProps> = (props) => {
    const { onClick } = props;

    return <div className={classes.Backdrop} onClick={onClick}></div>;
};
