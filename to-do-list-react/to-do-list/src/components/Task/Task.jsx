import styles from './Task.module.css';
import deleteIcon from '../../assets/icons/delete-icon.png';

function Task(props) {
  return (
    <>
      <div className={styles.container}>
        <p>{props.text}</p>
        <div className={styles.iconContainer}>
          <img
            className={styles.deleteIcon}
            src={deleteIcon}
            alt="delete icon"
          ></img>
        </div>
      </div>
    </>
  );
}

export default Task;
