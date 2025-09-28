import * as React from 'react';
import { useAtom } from 'jotai';
import { UseScenarioReturnType } from '../hooks/useScenario';
import { selectedScenarioAtom } from '../../atoms/atoms';

interface TransportControlsProps {
  scenario: UseScenarioReturnType;
}
function TransportControls({ scenario }: TransportControlsProps) {
  const [selectedScenario] = useAtom(selectedScenarioAtom);

  return (
    <div
      className={`transport-controls ${
        !selectedScenario || selectedScenario === 'none' ? 'hidden' : ''
      }`}
    >
      <button
        className="button"
        onClick={() => scenario.setIsPlaying(!scenario.isPlaying)}
        type="button"
      >
        {scenario.isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
}

export default TransportControls;
