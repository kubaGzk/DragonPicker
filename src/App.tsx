import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Form from "./Menu/Login";
import { withOverlay } from "./Overlay/withOverlay";
import { completeLoading } from "./store/gameStatus";
import GameStage from "./Game/GameStage";

function App() {
    const FormWithOverlay = withOverlay(Form);

    const { isAuth, loading } = useAppSelector((state) => state.gameStatus);
    const dispatch = useAppDispatch();

    const [localUser, setLocalUser] = useState<
        | {
              username: string;
              coins: number;
          }
        | undefined
    >(undefined);

    useEffect(() => {
        const username = localStorage.getItem("GAME_Username");
        const coins = parseInt(localStorage.getItem("GAME_Coins") || "");

        setLocalUser({ username: username || "", coins: coins });
    }, []);

    useEffect(() => {
        if (localUser) {
            dispatch(completeLoading());
        }
    }, [localUser, dispatch]);

    const clearLocalUser = () => {
        setLocalUser(undefined);
    };

    return (
        <div className="App">
            {!loading && <GameStage />}
            {!loading && !isAuth && (
                <FormWithOverlay
                    localUser={localUser}
                    clearLocalUser={clearLocalUser}
                />
            )}
        </div>
    );
}

export default App;
