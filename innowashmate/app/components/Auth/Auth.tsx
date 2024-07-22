import React, { ReactNode, useState } from 'react';
import AuthInputField from './AuthInputField/AuthInputField';

import './Auth.css';

interface Props {
  children: ReactNode;
}

const Auth: React.FC<Props> = ({ children }) => {
  return (
    <div className="auth">
      <div className="auth_block">{children}</div>
    </div>
  );
};

export default Auth;
