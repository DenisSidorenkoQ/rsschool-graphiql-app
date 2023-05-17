import React from 'react';

import { useLanguage } from '../../hooks/useLanguage';

export const Error = () => {
  const common = useLanguage('common');

  return (
    <div>
      <h1 style={{ color: 'red', textAlign: 'center', fontSize: '50px' }}>{common?.not_found}</h1>
    </div>
  );
};
