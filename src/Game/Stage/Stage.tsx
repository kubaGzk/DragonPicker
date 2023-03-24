import React, { FC } from "react";

import { Stage as PixiStage } from "@pixi/react";
import { ReactReduxContext } from "react-redux";
import { ContextBridge } from "../../store/ContextBridge";

interface StageProps {
    children: React.ReactNode;
    width: number;
    height: number;
}

type CombinedProps = StageProps & PixiStage;

const Stage: FC<CombinedProps> = ({ children, ...props }) => {
    return (
        <ContextBridge
            Context={ReactReduxContext}
            render={(children: React.ReactNode) => (
                <PixiStage {...props}>{children}</PixiStage>
            )}
        >
            {children}
        </ContextBridge>
    );
};

export default Stage;
