import React, { MouseEventHandler } from 'react';
import styles from './button.module.scss';

interface IProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  iconOnly?: boolean;
  type?: 'submit' | 'submit' | 'reset';
}

const Button = ({ iconOnly, className, children, onClick, disabled }: IProps) => {
  const classes = `
    ${styles['cmp-button']}
    ${iconOnly ? styles['cmp-button--icon-only'] : ''} 
    ${className ? className : ''}
    `;

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
