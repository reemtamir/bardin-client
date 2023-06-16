import { useContext } from 'react';

import { context } from '../contexts/AppContext';

export const useApp = () => useContext(context);
