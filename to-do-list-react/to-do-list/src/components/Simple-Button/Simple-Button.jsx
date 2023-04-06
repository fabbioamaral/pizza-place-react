import './Simple-Button.module.css';

function SimpleButton(props) {
  const buttonStyle = {
    color: props.color,
    backgroundColor: props.backgroundColor,
  };

  return (
    <>
      <button style={buttonStyle} onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  );
}

export default SimpleButton;
