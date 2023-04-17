import { useEffect, useMemo } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Menu from "./Menu/Menu";
import { localCheck } from "./store/auth";
import GameStage from "./Game/GameStage";
import FontFaceObserver from "fontfaceobserver";

function App() {
    const { isAuth, loading, menuOn } = useAppSelector((state) => ({
        ...state.auth,
        ...state.menu,
    }));
    const dispatch = useAppDispatch();

    const font = useMemo(() => new FontFaceObserver("Alagard"), []);

    useEffect(() => {
        dispatch(localCheck());

        font.load().then(
            () => {},
            () => console.error("No font found."),
        );
    }, [dispatch, font]);

    return (
        <div className="App">
            {!loading && <GameStage />}
            {!loading && (!isAuth || menuOn) && <Menu />}
        </div>
    );
}

export default App;
