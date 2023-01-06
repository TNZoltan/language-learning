import styles from './TextInput.module.scss';
import cx from 'classnames';

export const TextInput = ({
  disabled = false,
  errorMsg = false,
  ...rest
}) => {
  return (
    <div>
      <input
        className={cx(
          styles.text,
          { [styles.textError]: !!errorMsg },
          { [styles.textDisabled]: disabled }
        )}
        type="text"
        {...rest}
      />
      <div className={styles.errorText}>
          {errorMsg}
      </div>
    </div>

  )
}
