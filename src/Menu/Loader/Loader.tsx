import { FC } from "react";
import classes from "./Loader.module.css";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
    return <span className={classes.Loader}>Loading</span>;
};

export default Loader;
