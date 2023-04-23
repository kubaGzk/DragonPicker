import { FC, useState, useMemo } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { OutlineFilter } from "@pixi/filter-outline";

import Img_UserBar from "../../../assets/UI/Menu/UserBar.png";
import Img_Menu from "../../../assets/UI/Menu/Menu.png";
import { usernameTextStyle } from "../../../styles";
import { CurrentStatus } from "../../../types";
import { Filter, Spritesheet } from "pixi.js";

interface UserBarProps {
    username: string;
    scale: number;
    currentStatus: CurrentStatus;
    openMenuHandler: () => void;
    menuItems: Spritesheet;
}

const UserBar: FC<UserBarProps> = (props) => {
    const { username, scale, currentStatus, openMenuHandler } = props;

    const [filters, setFilters] = useState<Filter[]>([]);

    const outlineFilter = useMemo(
        () => new OutlineFilter(5, 0x000000, 0.1, 0.3),
        [],
    );

    const addFilterHandler = () => {
        currentStatus === CurrentStatus.Start && setFilters([outlineFilter]);
    };

    const removeFilterHandler = () => {
        currentStatus === CurrentStatus.Start && setFilters([]);
    };

    return (
        <Container x={30 * scale} y={10 * scale} scale={scale} anchor={0}>
            <Sprite image={Img_UserBar} x={0} y={0} />
            <Text
                text={username}
                style={usernameTextStyle}
                anchor={{ x: 0, y: 0.5 }}
                x={20}
                y={43}
            />

            {currentStatus === CurrentStatus.Start && (
                <Sprite
                    interactive={true}
                    image={Img_Menu}
                    x={340}
                    y={43}
                    scale={0.8}
                    anchor={{ x: 1, y: 0.5 }}
                    onmouseenter={addFilterHandler}
                    onmouseleave={removeFilterHandler}
                    onmousedown={openMenuHandler}
                    filters={filters}
                    cursor="pointer"
                />
            )}
        </Container>
    );
};

export default UserBar;
