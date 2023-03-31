import { FC } from "react";

import Grid from "./Grid/Grid";
interface MapProps {
    width: number;
    height: number;
}

const Map: FC<MapProps> = (props) => {
    const { width, height } = props;

    return (
        <>
            <Grid width={width} height={height} />
        </>
    );
};

export default Map;
