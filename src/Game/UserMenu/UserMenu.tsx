import { FC } from "react";
import CoinsBar from "./CoinsBar/CoinsBar";
import UserBar from "./UserBar/UserBar";
import { useAppSelector } from "../../hooks/hooks";

interface UserMenuProps {
    width: number;
    height: number;
}

const UserMenu: FC<UserMenuProps> = (props) => {
    const { width, height } = props;

    const { coins, username } = useAppSelector((state) => state.auth);

    return (
        <>
            <UserBar username={username} />
            <CoinsBar width={width} height={height} coins={coins} />
        </>
    );
};

export default UserMenu;
