import { useEffect, useState } from "react";

const useScenario = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundPosition, setSoundPosition] = useState([0, 0, 0]);

  const handlePlay = () => {
    setSoundPosition([
      Math.random() * 4 - 2,
      Math.random() * 4 - 2,
      Math.random() * 4 - 2,
    ]);
    setIsPlaying(true);
  };

  return { isPlaying, setIsPlaying, soundPosition, handlePlay };
};

export default useScenario;
