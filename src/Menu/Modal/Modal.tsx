import { FC, ReactNode } from "react";

import classes from "./Modal.module.css";
import ImgLogo from "../ImgLogo/ImgLogo";
import { withOverlay } from "../../Overlay/withOverlay";

interface ModalProps {
    children: ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
    const { children } = props;

    return (
        <div className={classes.Modal}>
            <ImgLogo />
            {children}
        </div>
    );
};

export default withOverlay(Modal);
