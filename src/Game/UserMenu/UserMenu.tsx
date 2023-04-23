import { FC } from "react";
import CoinsBar from "./CoinsBar/CoinsBar";
import UserBar from "./UserBar/UserBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { turnMenuOn } from "../../store/menu";
import { CurrentStatus } from "../../types";

interface UserMenuProps {
    width: number;
    height: number;
    scale: number;
}

const UserMenu: FC<UserMenuProps> = (props) => {
    const { width, height, scale } = props;

    const { coins, username, currentStatus, menuItems } = useAppSelector(
        (state) => ({
            ...state.auth,
            ...state.gameStatus,
            ...state.sprites,
        }),
    );

    const dispatch = useAppDispatch();

    const openMenuHandler = () => {
        if (currentStatus === CurrentStatus.Start) {
            dispatch(turnMenuOn());
        }
    };

    return (
        <>
            <UserBar
                username={username}
                scale={scale}
                currentStatus={currentStatus}
                openMenuHandler={openMenuHandler}
                menuItems={menuItems!}
            />
            <CoinsBar
                width={width}
                height={height}
                coins={coins}
                scale={scale}
                menuItems={menuItems!}
            />
        </>
    );
};

export default UserMenu;
