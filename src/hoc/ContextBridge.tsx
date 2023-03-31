import React from "react";
import { ReactReduxContext } from "react-redux";

interface ContextBridgeProps {
    children: React.ReactNode;
    Context: typeof ReactReduxContext;
    render: (children: React.ReactNode) => React.ReactNode;
}

export const ContextBridge: React.FC<ContextBridgeProps> = ({
    children,
    Context,
    render,
}) => {
    return (
        <Context.Consumer>
            {(value: any) =>
                render(
                    <Context.Provider value={value}>
                        {children}
                    </Context.Provider>,
                )
            }
        </Context.Consumer>
    );
};
