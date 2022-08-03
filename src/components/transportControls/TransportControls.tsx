import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedScenario } from '../../redux/selectors/scenarios';
import { UseScenarioProps } from '../hooks/useScenario';

interface TransportControlsProps {
  scenario: UseScenarioProps;
}
function TransportControls({ scenario }: TransportControlsProps) {
  const selectedScenario = useSelector(getSelectedScenario);

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
