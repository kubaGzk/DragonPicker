import { FC } from "react";
import CoinsBar from "./CoinsBar/CoinsBar";
import UserBar from "./UserBar/UserBar";

interface UserMenuProps {
    width: number;
    height: number;
}

const UserMenu: FC<UserMenuProps> = (props) => {
    const { width, height } = props;


    return (
        <>
            <UserBar />
            <CoinsBar width={width} height={height} />
        </>
    );
};

export default UserMenu;
