import { Scenario } from '../../types/Scenario';
import none from './none';
import rainstorm from './rainstorm';
import ocean from './ocean';

const scenarios: Record<string, Scenario> = {
    none,
    rainstorm,
    ocean,
};
export default scenarios;
