import { TextStyle } from "pixi.js";

export const startStyle = new TextStyle({
    align: "center",
    fontFamily: "Alagard",
    fontSize: 60,
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

export const endGameStyle = new TextStyle({
    align: "center",
    fontFamily: "Alagard",
    fontSize: 40,
    fontWeight: "800",
    fill: ["#ffffff", "#FCEE21"], // gradient
    stroke: "#c8a11fe6",
    strokeThickness: 5,
    letterSpacing: 2,
    dropShadow: true,
    dropShadowColor: "#444a57",
    dropShadowBlur: 5,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 3,
    wordWrap: true,
    wordWrapWidth: 220,
});

export const gridElementStyle = (elHeight: number, collectable: boolean) =>
    new TextStyle({
        align: "center",
        fontFamily: "Alagard",
        fontSize: elHeight * 0.45,
        fontWeight: "400",
        fill: collectable ? ["#ffffff", "#B6B393"] : ["#ffffff", "#B6B393"], 
        stroke: "#5A5749",
        strokeThickness: 2,
        letterSpacing: 8,
        dropShadow: true,
        dropShadowColor: "#5A5749",
        dropShadowBlur: 6,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 4,
        wordWrap: true,
        wordWrapWidth: 440,
        
    });

export const multiplierTextStyle = new TextStyle({
    align: "center",
    fontFamily: "Alagard",
    fontSize: 40,
    fontWeight: "600",
    fill: ["#ffffff", "#FCEE21"],
    stroke: "645110",
    strokeThickness: 5,
    letterSpacing: 5,
    dropShadow: true,
    dropShadowColor: "#444a57",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 10,
    wordWrap: true,
    wordWrapWidth: 440,
});

export const levelTextStyle = new TextStyle({
    align: "center",
    fontFamily: "Alagard",
    fontSize: 50,
    fontWeight: "400",
    fill: ["91A574", "B1D0B3"], // gradient
    stroke: "B1D0B3",
    strokeThickness: 3,
    letterSpacing: 10,
    dropShadow: true,
    dropShadowColor: "0x000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 600,
});

export const usernameTextStyle = new TextStyle({
    align: "center",
    fontFamily: "Alagard",
    fontSize: 35,
    fontWeight: "500",
    fill: ["#ffffff", "#ffffff"], // gradient
    stroke: "#808080",
    strokeThickness: 2,
    letterSpacing: 6,
    dropShadow: true,
    dropShadowColor: "#ccced2",
    dropShadowBlur: 2,
    dropShadowDistance: 2,
    wordWrap: true,
    wordWrapWidth: 440,
});

export const coinsTextStyle = new TextStyle({
    align: "center",
    fontFamily: "Alagard",
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
