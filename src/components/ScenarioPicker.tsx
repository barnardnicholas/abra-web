import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { DropdownOption } from '../types/DropdownOption';
import { usePrevious } from '../utils/utils';
import Select from './form/Select';

const scenarioOptions: DropdownOption<string>[] = [
    { label: '', value: ''}
]

interface ScenarioPickerProps {
    setCompactHeader: Dispatch<SetStateAction<boolean>>;
}

const ScenarioPicker: React.FC<ScenarioPickerProps> = () => {

    return <Select name="scenarioPicker" value={null} options={scenarioOptions} onChange={()=>{}}/>
}

export default ScenarioPicker;