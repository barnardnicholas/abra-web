import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setIsPlaying } from '../../redux/actions/currentScenario';
import { getIsPlaying } from '../../redux/selectors/currentScenario';
import { getSelectedScenario } from '../../redux/selectors/scenarios';
import { UseScenarioProps } from '../hooks/useScenario';

interface TransportControlsProps {
  scenario: UseScenarioProps;
}
const TransportControls: React.FC<TransportControlsProps> = ({ scenario }) => {
  const dispatch = useDispatch();
  const selectedScenario = useSelector(getSelectedScenario);
  const isPlaying = useSelector(getIsPlaying);

  return (
    <div
      className={`transport-controls ${
        !selectedScenario || selectedScenario === 'none' ? 'hidden' : ''
      }`}
    >
      <button className="button" onClick={() => dispatch(setIsPlaying(!isPlaying))}>
        {scenario.isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default TransportControls;
