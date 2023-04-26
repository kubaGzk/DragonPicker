import { useEffect, useMemo } from "react";
import FontFaceObserver from "fontfaceobserver";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Menu from "./Menu/Menu";
import {
    completeAssetLoading,
    errorAssetLoading,
    localCheck,
} from "./store/auth";
import GameStage from "./Game/GameStage";
import { assetLoader } from "./assetLoader";
import classes from "./App.module.css";


function App() {
    const { assetsLoaded, mousePointer } = useAppSelector((state) => ({
        ...state.auth,
        ...state.menu,
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        assetLoader(
            () => {
                dispatch(completeAssetLoading());
            },
            () => {
                dispatch(errorAssetLoading());
            },
        );
    }, []);

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
