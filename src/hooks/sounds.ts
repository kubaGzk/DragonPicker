import useSound from "use-sound";

import clickSound from "../assets/Sounds/Click.wav";
import collectSound from "../assets/Sounds/Collect.mp3";
import winSound from "../assets/Sounds/Win.mp3";
import loseSound from "../assets/Sounds/Lose.mp3";
import hitSound from "../assets/Sounds/Hit.mp3";
import missSound from "../assets/Sounds/Miss.mp3";
import dragonSound from "../assets/Sounds/Dragon.mp3";

interface UseSounds {
    playClick: () => void;
    playCollect: () => void;
    playWin: () => void;
    playLose: () => void;
    playHit: () => void;
    playMiss: () => void;
    playDragon: () => void;
}

export const useSounds = (): UseSounds => {
    const [playClick] = useSound(clickSound);
    const [playCollect] = useSound(collectSound);
    const [playWin] = useSound(winSound);
    const [playLose] = useSound(loseSound);
    const [playHit] = useSound(hitSound);
    const [playMiss] = useSound(missSound);
    const [playDragon] = useSound(dragonSound);

    return {
        playClick,
        playCollect,
        playWin,
        playLose,
        playHit,
        playMiss,
        playDragon,
    };
};
