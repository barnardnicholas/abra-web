import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedScenario } from '../../redux/selectors/scenarios';
import { UseScenarioProps } from '../hooks/useScenario';

interface TransportControlsProps {
  scenario: UseScenarioProps;
}
const TransportControls: React.FC<TransportControlsProps> = ({ scenario }) => {
  const selectedScenario = useSelector(getSelectedScenario);
  return (
    <div className={`transport-controls ${selectedScenario === 'none' ? 'hidden' : ''}`}>
      <button className="button" onClick={() => scenario.setIsPlaying(!scenario.isPlaying)}>
        {scenario.isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default TransportControls;
