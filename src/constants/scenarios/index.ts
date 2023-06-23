import { Scenario } from '../../types/Scenario';
import none from './none';
import rainstorm from './rainstorm';
import ocean from './ocean';
import forest from './forest';
import city from './city';
import campfire from './campfire';
import jungle from './jungle';

const scenarios: Record<string, Scenario> = {
  none,
  rainstorm,
  ocean,
  forest,
  city,
  campfire,
  jungle,
};
export default scenarios;
