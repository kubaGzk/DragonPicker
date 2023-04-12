import { TextStyle } from "pixi.js";

export const startStyle = new TextStyle({
    align: "center",
    fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
    fontSize: 20,
    fontWeight: "900",
    fill: ["#ffffff", "#FCEE21"], // gradient
    stroke: "#c8a11fe6",
    strokeThickness: 5,
    letterSpacing: 10,
    dropShadow: true,
    dropShadowColor: "#444a57",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

export const gridElementStyle = (elHeight: number, collectable: boolean) =>
    new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: elHeight * 0.45,
        fontWeight: "400",
        fill: collectable ? ["#ffffff", "#00ff99"] : ["#ffffff", "#00ff59"], // gradient
        stroke: "#01d27e",
        strokeThickness: 2,
        letterSpacing: 8,
        dropShadow: true,
        dropShadowColor: "#ccced2",
        dropShadowBlur: 6,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 4,
        wordWrap: true,
        wordWrapWidth: 440,
    });
