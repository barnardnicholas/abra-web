import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import { isEmpty, usePrevious } from '../../utils/utils';
import { UseScenarioProps } from '../hooks/useScenario';

interface SoundsTallyItem {
  fullPath: string;
  fileName: string;
  isPlaying: boolean;
  displayDuration: string;
}

type SoundsTally = Record<string, SoundsTallyItem>;

type LastPlayed = Record<string, number | null>;

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

function ChannelDebug({ channel }: ChannelProps) {
  const { name, slug, isPlaying, durations, type, paths } = channel;

  const [lastPlayed, setLastPlayed] = useState<LastPlayed>(
    Object.keys(isPlaying).reduce((acc: LastPlayed, curr: string) => {
      return { ...acc, [curr]: null };
    }, {}),
  );

  const soundsTally: SoundsTally = paths.reduce((acc: SoundsTally, curr: string, i: number) => {
    const fileName: string = curr.split('/').pop() || '-';
    const fileSlug: string = fileName.split('.')[0];
    const newItem: SoundsTallyItem = {
      fileName,
      fullPath: curr,
      isPlaying: isPlaying[curr] || false,
      displayDuration: !Number.isNaN(durations[i]) ? `${(durations[i] / 1000).toFixed(1)}s` : '0',
    };
    return { ...acc, [fileSlug]: newItem };
  }, {} as SoundsTally);

  return (
    <div className="debug-item">
      <strong>{`${soundTypes[type]} Channel: ${name} (${slug})`}</strong>
      <div>
        <table className="debug-table">
          <thead>
            <tr>
              <td>FileName</td>
              <td>Is Playing</td>
              <td>Duration</td>
            </tr>
          </thead>
          <tbody>
            {Object.values(soundsTally).map((item: SoundsTallyItem, i: number) => {
              return (
                <FileDebug
                  item={item}
                  lastPlayed={lastPlayed[item.fullPath]}
                  duration={durations[i]}
                  setLastPlayed={setLastPlayed}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
    </div>
  );
}

function Debug({ scenario }: DebugProps) {
  return (
    <div className="debug">
      <div>
        <div>{`Scenario isPlaying: ${scenario.isPlaying}`}</div>
        <br />
      </div>
      <div className="item-container">
        {!isEmpty(scenario.soundChannels) &&
          Object.values(scenario.soundChannels).map((channel: SoundChannel) => (
            <ChannelDebug key={channel.id} channel={channel} />
          ))}
      </div>
    </div>
  );
}

interface FileProps {
  item: SoundsTallyItem;
  lastPlayed: number | null;
  duration: number;
  setLastPlayed: Dispatch<SetStateAction<LastPlayed>>;
}

interface DebugProps {
  scenario: UseScenarioProps;
}

interface ChannelProps {
  channel: SoundChannel;
}

export default Debug;
