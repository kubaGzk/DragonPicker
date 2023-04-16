import { FC } from "react";

import Logo from "../../assets/UI/GameLogo/GameLogo.png";

interface ImgLogoProps {}

const ImgLogo: FC<ImgLogoProps> = () => {
    return <img src={Logo} alt="Logo.png" />;
};

export default ImgLogo;
