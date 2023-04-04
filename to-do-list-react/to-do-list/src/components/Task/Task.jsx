import styles from './Task.module.css';
import deleteIcon from '../../assets/icons/delete-icon.png';
import IconButton from '../Icon-Button/Icon-Button';

function Task(props) {
  return (
    <>
      <div className={styles.container}>
        <p>{props.text}</p>
        <div className={styles.iconContainer}>
          <IconButton src={deleteIcon} alt="delete-icon" />
        </div>
      </div>
    </>
  );
}

export default Task;
