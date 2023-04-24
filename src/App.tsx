import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Menu from "./Menu/Menu";
import { completeAssetLoading, localCheck } from "./store/auth";
import GameStage from "./Game/GameStage";
import FontFaceObserver from "fontfaceobserver";
import { assetLoader } from "./assetLoader";
import { setSprites } from "./store/sprites";

import classes from "./App.module.css";

function App() {
    const { assetsLoaded, mousePointer } = useAppSelector((state) => ({
        ...state.auth,
        ...state.menu,
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        const sprites = assetLoader(() => {
            dispatch(completeAssetLoading());
        });

        dispatch(setSprites(sprites));
    }, [dispatch]);

    const font = useMemo(() => new FontFaceObserver("Alagard"), []);
    useEffect(() => {
        dispatch(localCheck());

        font.load().then(
            () => {},
            () => console.error("No font found."),
        );
    }, [dispatch, font]);

    const appClasses = [classes.App];
    if (mousePointer) {
        appClasses.push(classes.Pointer);
    }

    return (
        <div className={appClasses.join(" ")}>
            {assetsLoaded && <GameStage />}
            <Menu />
        </div>
    );
}

export default App;
