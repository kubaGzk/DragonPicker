import React, { FC } from "react";

import { Stage } from "@pixi/react";
import { ReactReduxContext } from "react-redux";
import { ContextBridge } from "../../hoc/ContextBridge";

interface StageProps {
    children: React.ReactNode;
    width: number;
    height: number;
}

const BridgedStage: FC<StageProps> = ({ children, ...props }) => {
    return (
        <ContextBridge
            Context={ReactReduxContext}
            render={(children: React.ReactNode) => (
                <Stage {...props}>{children}</Stage>
            )}
        >
            {children}
        </ContextBridge>
    );
};

export default BridgedStage;
