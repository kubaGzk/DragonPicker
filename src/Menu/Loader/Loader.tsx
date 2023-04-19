import { FC } from "react";
import classes from "./Loader.module.css";
import Modal from "../Modal/Modal";
import { withOverlay } from "../../Overlay/withOverlay";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
    const ModalWithOverlay = withOverlay(Modal);

    return (
        <ModalWithOverlay>
            <span className={classes.Loader}>Loading</span>
        </ModalWithOverlay>
    );
};

export default Loader;
