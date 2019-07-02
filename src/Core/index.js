import reducer from './reducer';

import { Input, Textarea, Button } from './Molecules';
import { Icon } from './Atoms';
import * as Pages from './Pages';
import * as Layouts from './Layouts';

const Atoms = { Icon };
const Molecules = { Input, Textarea, Button };

export {
  reducer,
  Layouts,
  Pages,
  Molecules,
  Atoms,
};
