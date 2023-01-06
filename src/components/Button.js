import styles from './Button.module.scss';
import cx from 'classnames';

export const Button = ({ variant = 'neutral', size='normal', children, ...rest }) => {
  return (
    <button
      className={cx(styles.button, styles[`${variant}Button`], styles[`${size}Button`])}
      {...rest}
    >
      {children}
    </button>
  )
}
