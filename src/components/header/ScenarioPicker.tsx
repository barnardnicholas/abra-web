import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScenario } from '../../redux/actions/scenario';
import { getSelectedScenario } from '../../redux/selectors/scenarios';
import { DropdownOption } from '../../types/DropdownOption';
import Select from '../form/Select';

const scenarioOptions: DropdownOption<string>[] = [
  { label: 'Ocean', value: 'ocean' },
  { label: 'Rainstorm', value: 'rainstorm' },
  { label: 'Forest', value: 'forest' },
  { label: 'City', value: 'city' },
  { label: 'Campfire', value: 'campfire' },
  { label: 'Jungle', value: 'jungle' },
];

interface ScenarioPickerProps {
  stopScenario: () => void;
  isPlaying: boolean;
}

function ScenarioPicker({ stopScenario, isPlaying }: ScenarioPickerProps) {
  const dispatch = useDispatch();

  const selectedScenario = useSelector(getSelectedScenario);

  const handleChange = (_: string, value: string | number | null) => {
    stopScenario();
    dispatch(setScenario(null));
    setTimeout(() => dispatch(setScenario(value)), 10);
  };

  return (
    <Select
      name="scenarioPicker"
      value={selectedScenario}
      options={scenarioOptions}
      onChange={handleChange}
      placeholder="Choose scenario"
      disabled={isPlaying}
    />
  );
}

export default ScenarioPicker;
