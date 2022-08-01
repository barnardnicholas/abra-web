import React from 'react';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import { isEmpty } from '../../utils/utils';
import { UseScenarioProps } from '../hooks/useScenario';

/* eslint-disable */
interface SoundsTallyItem {
  fileName: string;
  isPlaying: boolean;
  duration: string;
}
/* eslint-enable */

type SoundsTally = Record<string, SoundsTallyItem>;

function ChannelDebug({ channel }: ChannelProps) {
  const { name, slug, isPlaying, durations, type, paths } = channel;
  const soundsTally: SoundsTally = paths.reduce((acc: SoundsTally, curr: string, i: number) => {
    const fileName: string = curr.split('/').pop() || '-';
    const fileSlug: string = fileName.split('.')[0];
    const newItem: SoundsTallyItem = {
      fileName,
      isPlaying: isPlaying[curr] || false,
      duration: !Number.isNaN(durations[i]) ? `${(durations[i] / 1000).toFixed(1)}s` : '0',
    };
    return { ...acc, [fileSlug]: newItem };
  }, {} as SoundsTally);
  return (
    <div>
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
            {Object.values(soundsTally).map(
              /* eslint-disable */
              ({ fileName, isPlaying, duration }: SoundsTallyItem) => (
                /* eslint-enable */
                <tr key={fileName}>
                  <td>{fileName}</td>
                  <td>{`${isPlaying ? 'Yes' : ''}`}</td>
                  <td>{duration}</td>
                </tr>
              ),
            )}
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
      {!isEmpty(scenario.soundChannels) &&
        Object.values(scenario.soundChannels).map((channel: SoundChannel) => (
          <ChannelDebug key={channel.id} channel={channel} />
        ))}
    </div>
  );
}

interface DebugProps {
  scenario: UseScenarioProps;
}

interface ChannelProps {
  channel: SoundChannel;
}

export default Debug;
