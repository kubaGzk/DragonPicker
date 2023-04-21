import { FC, useEffect, useState } from "react";

import Logo from "../../assets/UI/GameLogo/GameLogo.png";
import classes from "./ImgLogo.module.css";

interface ImgLogoProps {}

const ImgLogo: FC<ImgLogoProps> = () => {
    let [img, setImg] = useState<HTMLImageElement | undefined>();

    useEffect(() => {
        const newImg = new Image();
        newImg.src = Logo;

        setImg(newImg);
    }, []);

    return img ? (
        <img src={img.src} alt="Logo.png" className={classes.ImgLogo} />
    ) : null;
};

export default ImgLogo;
