import { FC, useState, useMemo } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { OutlineFilter } from "@pixi/filter-outline";

import Img_UserBar from "../../../assets/UI/Menu/UserBar.png";
import Img_Menu from "../../../assets/UI/Menu/Menu.png";
import { usernameTextStyle } from "../../../styles";
import { scaleCalculator } from "../../../utils";

interface UserBarProps {
    username: string;
    width: number;
    height: number;
}

const UserBar: FC<UserBarProps> = (props) => {
    const { username, width, height } = props;

    const [filters, setFilters] = useState<OutlineFilter[]>([]);

    const outlineFilter = useMemo(
        () => new OutlineFilter(5, 0x000000, 0.1, 0.3),
        [],
    );

    const addFilterHandler = () => {
        setFilters([outlineFilter]);
    };

    const removeFilterHandler = () => {
        setFilters([]);
    };

    return (
        <Container x={30} y={10} scale={scaleCalculator(width,height)} anchor={0}>
            <Sprite image={Img_UserBar} x={0} y={0} />
            <Text
                text={username}
                style={usernameTextStyle}
                anchor={{ x: 0, y: 0.5 }}
                x={20}
                y={43}
            />

            <Sprite
                interactive={true}
                image={Img_Menu}
                x={340}
                y={43}
                scale={0.8}
                anchor={{ x: 1, y: 0.5 }}
                onmouseenter={addFilterHandler}
                onmouseleave={removeFilterHandler}
                onmousedown={() => {
                    console.log("click");
                }}
                filters={filters}
                cursor="pointer"
            />
        </Container>
    );
};

export default UserBar;
