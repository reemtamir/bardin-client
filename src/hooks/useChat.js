import { useContext } from 'react';

import { context } from '../contexts/ChatContext';

export const useChat = () => useContext(context);
