import { useSelector } from 'react-redux';
import { getSavedScenarios } from '../../redux/selectors/userData';
import presetScenarios from '../../constants/scenarios';

const useSavedAndPresetScenarios = (slug: string) => {
  const savedScenarios = useSelector(getSavedScenarios);

  const currentScenario = savedScenarios[slug] || presetScenarios[slug] || presetScenarios.none;

  return { currentScenario, savedScenarios, presetScenarios };
};

export default useSavedAndPresetScenarios;
