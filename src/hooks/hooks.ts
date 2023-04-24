import { useState, useEffect, useCallback, MouseEvent } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

interface UseWindowResize {
    width: number;
    height: number;
}

export const useWindowResize = (): UseWindowResize => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useMouseMove() {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const onMouseMove = useCallback((e: MouseEvent): void => {
        e.preventDefault();
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }, []);

    return { mouseX, mouseY, onMouseMove };
}
