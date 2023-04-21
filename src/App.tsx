import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Menu from "./Menu/Menu";
import { localCheck } from "./store/auth";
import GameStage from "./Game/GameStage";
import FontFaceObserver from "fontfaceobserver";
import Loader from "./Menu/Loader/Loader";
import { assetLoader } from "./assetLoader";
import Modal from "./Menu/Modal/Modal";

function App() {
    const { isAuth, loading, menuOn } = useAppSelector((state) => ({
        ...state.auth,
        ...state.menu,
    }));
    const dispatch = useAppDispatch();

    const font = useMemo(() => new FontFaceObserver("Alagard"), []);

    const [assetLoading, setAssetLoading] = useState<boolean>(true);

    useEffect(() => {
        const sprites = assetLoader(() => {
            console.log("Resolved");
            setAssetLoading(false);
        });
    }, []);

    useEffect(() => {
        dispatch(localCheck());

        font.load().then(
            () => {},
            () => console.error("No font found."),
        );
    }, [dispatch, font]);

    return (
        <div className="App">
            {!assetLoading && <GameStage />}
            <Menu assetLoading={assetLoading} />
        </div>
    );
}

export default App;
