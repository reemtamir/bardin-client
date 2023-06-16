import { useContext } from 'react';

import { context } from '../contexts/AuthContext';

export const useAuth = () => useContext(context);
