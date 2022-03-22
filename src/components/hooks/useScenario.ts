import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Vector3 } from "three";

const useScenario = (): ReturnProps => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundPosition, setSoundPosition] = useState(new Vector3(0, 0, 0));

  const handlePlay = () => {
    setSoundPosition(
      new Vector3(
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
      )
    );
    setIsPlaying(true);
  };

  return { isPlaying, setIsPlaying, soundPosition, handlePlay };
};

interface ReturnProps {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  soundPosition: Vector3;
  handlePlay: () => void;
}

export default useScenario;
