import { useContext } from 'react';

import { context } from '../components/AuthContext';

export const useAuth = () => useContext(context);
