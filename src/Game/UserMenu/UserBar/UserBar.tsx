import { FC, useState } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import Img_UserBar from "../../../assets/UI/Menu/UserBar.png";
import Img_Menu from "../../../assets/UI/Menu/Menu.png";

interface UserBarProps {
    username: string;
}

const UserBar: FC<UserBarProps> = (props) => {
    const { username } = props;

    const [menuSize, setMenuSize] = useState<number>(28);

    const usernameStyle = new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 20,
        fontWeight: "400",
        fill: ["#ffffff", "#ffffff"], // gradient
        stroke: "#808080",
        strokeThickness: 2,
        letterSpacing: 10,
        dropShadow: true,
        dropShadowColor: "#ccced2",
        dropShadowBlur: 5,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    return (
        <Container x={30} y={10}>
            <Sprite
                image={Img_UserBar}
                x={0}
                y={0}
                width={250}
                height={60}
                anchor={0}
            />

            <Text
                text={username}
                style={usernameStyle}
                x={10}
                y={10}
                anchor={0}
            />
            <Sprite
                interactive={true}
                image={Img_Menu}
                x={210}
                y={15}
                width={menuSize}
                height={menuSize}
                onmouseenter={() => {
                    console.log("enter");
                    setMenuSize(30);
                }}
                onmouseleave={() => {
                    setMenuSize(28);
                    console.log("leave");
                }}
                onmousedown={() => {
                    console.log("click");
                }}
            />
        </Container>
    );
};

export default UserBar;
