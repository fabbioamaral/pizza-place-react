import styles from './Input.module.css';

function Input({ handleIputText }) {
  return (
    <input
      className={styles.input}
      placeholder="Add a new task"
      onChange={(event) => handleIputText(event.target.value)}
    ></input>
  );
}

export default Input;
