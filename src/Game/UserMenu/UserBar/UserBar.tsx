import { FC, useState, useMemo } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { OutlineFilter } from "@pixi/filter-outline";

import { usernameTextStyle } from "../../../styles";
import { CurrentStatus } from "../../../types";
import { Assets, Filter, Texture } from "pixi.js";
import { useSounds } from "../../../hooks/sounds";

interface UserBarProps {
    username: string;
    scale: number;
    currentStatus: CurrentStatus;
    openMenuHandler: () => void;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
}

const UserBar: FC<UserBarProps> = (props) => {
    const {
        username,
        scale,
        currentStatus,
        openMenuHandler,
        turnPointerOnHandler,
        turnPointerOffHandler,
    } = props;

    const [filters, setFilters] = useState<Filter[]>([]);

    const outlineFilter = useMemo(
        () => new OutlineFilter(5, 0x000000, 0.1, 0.3),
        [],
    );

    const menu: Texture = Assets.get("menu");
    const userBar: Texture = Assets.get("userBar");

    const { playClick } = useSounds();

    const mouseEnter = () => {
        setFilters([outlineFilter]);
        turnPointerOnHandler();
    };

    const mouseLeave = () => {
        setFilters([]);
        turnPointerOffHandler();
    };

    const mouseClick = () => {
        openMenuHandler();
        turnPointerOffHandler();
        playClick();
    };

    return (
        <Container x={30 * scale} y={10 * scale} scale={scale} anchor={0}>
            <Sprite texture={userBar} x={0} y={0} />
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
                    texture={menu}
                    x={340}
                    y={43}
                    scale={0.8}
                    anchor={{ x: 1, y: 0.5 }}
                    onmouseenter={mouseEnter}
                    onmouseleave={mouseLeave}
                    onclick={mouseClick}
                    filters={filters}
                />
            )}
        </Container>
    );
};

export default UserBar;
