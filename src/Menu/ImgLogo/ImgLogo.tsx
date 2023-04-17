import { FC } from "react";

import Logo from "../../assets/UI/GameLogo/GameLogo.png";
import classes from "./ImgLogo.module.css"

interface ImgLogoProps {}

const ImgLogo: FC<ImgLogoProps> = () => {
    return <img src={Logo} alt="Logo.png" className={classes.ImgLogo} />;
};

export default ImgLogo;
