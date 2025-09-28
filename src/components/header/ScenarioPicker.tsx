import React from 'react';
import { useAtom } from 'jotai';
import { DropdownOption } from '../../types/DropdownOption';
import Select from '../form/Select';
import { selectedScenarioAtom } from '../../atoms/atoms';

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
  const [selectedScenario, setSelectedScenario] = useAtom(selectedScenarioAtom);

  const handleChange = (_: string, value: string | number | null) => {
    stopScenario();
    setSelectedScenario(null);
    setTimeout(() => setSelectedScenario(value as string | null), 10);
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
