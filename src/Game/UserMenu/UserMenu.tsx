import { FC } from "react";
import CoinsBar from "./CoinsBar/CoinsBar";
import UserBar from "./UserBar/UserBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { CurrentStatus } from "../../types";
import { turnMenuOn } from "../../store/menu";

interface UserMenuProps {
    width: number;
    height: number;
    scale: number;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
}

const UserMenu: FC<UserMenuProps> = (props) => {
    const {
        width,
        height,
        scale,
        turnPointerOnHandler,
        turnPointerOffHandler,
    } = props;

    const { coins, username, currentStatus } = useAppSelector((state) => ({
        ...state.auth,
        ...state.gameStatus,
        // ...state.sprites,
    }));

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
                turnPointerOnHandler={turnPointerOnHandler}
                turnPointerOffHandler={turnPointerOffHandler}
                // menuItems={menuItems!}
            />
            <CoinsBar
                width={width}
                height={height}
                coins={coins}
                scale={scale}
                // menuItems={menuItems!}
            />
        </>
    );
};

export default UserMenu;
