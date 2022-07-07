import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setScenario } from '../../redux/actions/scenario';
import { getSelectedScenario } from '../../redux/selectors/scenarios';
import { DropdownOption } from '../../types/DropdownOption';
import { usePrevious } from '../../utils/utils';
import Select from '../form/Select';

const scenarioOptions: DropdownOption<string>[] = [
    { label: 'Ocean', value: 'ocean'},
    { label: 'Rainstorm', value: 'rainstorm'},
]

interface ScenarioPickerProps {
    stopScenario: () => void;
    isPlaying: boolean;
}

const ScenarioPicker:React.FC<ScenarioPickerProps> = ({stopScenario, isPlaying}) => {
    const dispatch = useDispatch();

    const selectedScenario = useSelector(getSelectedScenario)

    const handleChange = (_: string, value: string | number | null) => {
        stopScenario();
        dispatch(setScenario(null))
        setTimeout(() =>  dispatch(setScenario(value)), 10);
    }

    return <Select name="scenarioPicker" value={selectedScenario} options={scenarioOptions} onChange={handleChange} placeholder="Choose scenario" disabled={isPlaying}/>
}

export default ScenarioPicker;