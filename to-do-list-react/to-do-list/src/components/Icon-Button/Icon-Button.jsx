import styles from './Icon-Button.module.css';

function IconButton(props) {
  return (
    <>
      <img
        className={styles.icon}
        src={props.src}
        alt={!!props.alt ? props.alt : 'icon'}
      ></img>
    </>
  );
}

export default IconButton;
