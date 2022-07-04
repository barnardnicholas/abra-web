import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setScenario } from '../redux/actions/scenario';
import { getSelectedScenario } from '../redux/selectors/scenarios';
import { DropdownOption } from '../types/DropdownOption';
import { usePrevious } from '../utils/utils';
import Select from './form/Select';

const scenarioOptions: DropdownOption<string>[] = [
    { label: 'Ocean', value: 'ocean'},
    { label: 'Rainstorm', value: 'rainstorm'},
]

interface ScenarioPickerProps {
    setCompactHeader: Dispatch<SetStateAction<boolean>>;
}

const ScenarioPicker: React.FC<ScenarioPickerProps> = () => {
    const dispatch = useDispatch();

    const selectedScenario = useSelector(getSelectedScenario)

    const handleChange = (_: string, value: string | number | null) => {
        dispatch(setScenario(value));
    }

    return <Select name="scenarioPicker" value={selectedScenario} options={scenarioOptions} onChange={handleChange}/>
}

export default ScenarioPicker;