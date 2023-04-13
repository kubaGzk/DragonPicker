import { FC, useState, useMemo } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { OutlineFilter } from "@pixi/filter-outline";

import Img_UserBar from "../../../assets/UI/Menu/UserBar.png";
import Img_Menu from "../../../assets/UI/Menu/Menu.png";
import { usernameTextStyle } from "../../../styles";

interface UserBarProps {
    username: string;
}

const UserBar: FC<UserBarProps> = (props) => {
    const { username } = props;

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
                    style={usernameTextStyle}
                    x={10}
                    y={10}
                    anchor={0}
                />

            <Sprite
                interactive={true}
                image={Img_Menu}
                x={210}
                y={15}
                width={28}
                height={28}
                onmouseenter={addFilterHandler}
                onmouseleave={removeFilterHandler}
                onmousedown={() => {
                    console.log("click");
                }}
                filters={filters}
            />
        </Container>
    );
};

export default UserBar;
