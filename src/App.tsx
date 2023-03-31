import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Form from "./Form/Login";
import { withOverlay } from "./Overlay/withOverlay";
import { completeLoading } from "./store/auth";
import GameStage from "./Game/GameStage";

function App() {
    const FormWithOverlay = withOverlay(Form);

    const { isAuth, loading } = useAppSelector((state) => state.auth);
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
            <GameStage />

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
