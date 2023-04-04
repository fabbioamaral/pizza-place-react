import styles from './To-do-list.module.css';
import Input from '../../components/Input/Input';
import SimpleButton from '../../components/Simple-Button/Simple-Button';
import Task from '../../components/Task/Task';

function ToDoList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>To-Do List</h1>
      <div className={styles.card}>
        <div>
          <Input />
          <SimpleButton
            text="Add"
            color="white"
            backgroundColor="rgb(18, 33, 129)"
          />
        </div>
        <div className="">
          <Task text="I will wake up early" />
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
