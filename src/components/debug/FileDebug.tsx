import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { usePrevious } from '../../utils/utils';
import { LastPlayed, SoundsTallyItem } from './Debug';

interface FileProps {
  item: SoundsTallyItem;
  lastPlayed: number | null;
  duration: number;
  setLastPlayed: Dispatch<SetStateAction<LastPlayed>>;
}

function FileDebug({ item, lastPlayed, duration, setLastPlayed }: FileProps) {
  const { fileName, isPlaying, fullPath, displayDuration } = item;
  const prevProps = usePrevious({ lastPlayed, isPlaying });

  const playIndicatorStyle = {
    transition: `max-width ${duration}ms linear`,
  };

  useEffect(() => {
    if (!prevProps.isPlaying && isPlaying) {
      console.log('updating last played');
      setLastPlayed((prevLastPlayed: LastPlayed) => ({
        ...prevLastPlayed,
        [fullPath]: dayjs().valueOf(),
      }));
    }
    /* eslint-disable */
  }, [isPlaying, prevProps.isPlaying]);
  /* eslint-enable */

  return (
    <tr key={fileName}>
      <td>{fileName}</td>
      <td>
        <div className={`play-indicator ${isPlaying ? 'active' : ''}`} style={playIndicatorStyle} />
        {`${isPlaying ? 'Yes' : ''}`}
      </td>
      <td>{displayDuration}</td>
    </tr>
  );
}

export default FileDebug;
