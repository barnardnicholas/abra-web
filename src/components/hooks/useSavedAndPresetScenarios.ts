import presetScenarios from '../../constants/scenarios';
import { Scenario } from '../../types/Scenario';

const useSavedAndPresetScenarios = (slug: string) => {
  const savedScenarios: Record<string, Scenario> = {}; // TODO - Returns nothing for now

  const currentScenario = savedScenarios[slug] || presetScenarios[slug] || presetScenarios.none;
  console.log(currentScenario);

  return { currentScenario, savedScenarios, presetScenarios };
};

export default useSavedAndPresetScenarios;
