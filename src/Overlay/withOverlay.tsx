import React from "react";
import { createPortal } from "react-dom";
import { Backdrop } from "./Backdrop/Backdrop";

const overlay = document.getElementById("overlay") as HTMLDivElement;

interface WithOverlay {}

export function withOverlay<P extends WithOverlay>(
    Component: React.FC<P>,
): React.FC<P> {
    const ElementWithOverlay: React.FC<P> = (props: P) => {
        let element = (
            <>
                <div data-test="overlay" className="overlay">
                    <Component {...(props as P)} />
                </div>
                <Backdrop />
            </>
        );
        if (overlay) {
            element = createPortal(
                <>
                    <div data-test="overlay" className="overlay">
                        <Component {...(props as P)} />
                    </div>
                    <Backdrop />
                </>,
                overlay,
            );
        }

        return element;
    };

    return ElementWithOverlay;
}
