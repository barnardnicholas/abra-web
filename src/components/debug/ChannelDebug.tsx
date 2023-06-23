import React, { useState } from 'react';
import { LastPlayed, SoundsTally, SoundsTallyItem } from '../../types/Debug';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import FileDebug from './FileDebug';

interface ChannelProps {
  channel: SoundChannel;
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
                  key={item.fileName}
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

export default ChannelDebug;
