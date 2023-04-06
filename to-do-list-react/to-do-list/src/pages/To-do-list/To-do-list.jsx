import styles from './To-do-list.module.css';
import Input from '../../components/Input/Input';
import SimpleButton from '../../components/Simple-Button/Simple-Button';
import Task from '../../components/Task/Task';
import { database } from '../../utils/firebase';
import { ref, set, get, child } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';

function ToDoList() {
  const [toDoTask, setToDoTask] = useState();

  useEffect(() => {
    getToDoList();
  }, []);

  const getToDoList = async () => {
    console.log('hello - GET');
    try {
      const result = await get(child(ref(database), 'todolist/toDoTask'));
      if (result.exists()) {
        console.log(result.val());
      } else {
        console.log('No data available');
      }
      setToDoTask('');
    } catch (err) {
      console.log('Error trying to get tasks');
      console.log(err);
    }
  };

  const pushTask = async () => {
    console.log('hello');
    try {
      const result = await set(ref(database, 'todolist/'), {
        task: toDoTask,
      });
      setToDoTask('');
    } catch (err) {
      console.log('Error trying to save task');
      console.log(err);
    }
  };

  const handleIputText = (taskText) => {
    setToDoTask(taskText);
    console.log(taskText);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>To-Do List</h1>
      <div className={styles.card}>
        <div>
          <Input handleIputText={handleIputText} />
          <SimpleButton
            text="Add"
            color="white"
            backgroundColor="rgb(18, 33, 129)"
            handleClick={pushTask}
          />
        </div>
        <div>
          <Task text="I will wake up early" />
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
