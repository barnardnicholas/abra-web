import { Scenario } from '../../types/Scenario';
import rainstorm from './rainstorm';
import ocean from './ocean';

const scenarios: Record<string, Scenario> = {
    rainstorm,
    ocean,
};
export default scenarios;
