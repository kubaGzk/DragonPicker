import { FC, ReactNode } from "react";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
}

const Button: FC<ButtonProps> = (props) => {
    const { onClick, children } = props;

    return <button onClick={onClick}>{children}</button>;
};

export default Button;
