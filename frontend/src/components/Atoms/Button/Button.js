import { Button } from '@material-ui/core';

function CustomButton(props) {
  const click = props.onClick;
  return (
    <Button
        id={`seat${props.seatRow * 4 + props.number}`}
        onClick={()=> click(props.seatRow * 4 + props.number)}
        variant={props.variant}
        style={{ margin: '5px auto', backgroundColor: 'lightgreen' }}>
        {props.seatRow * 4 + props.number}
    </Button>
  );
}
export default CustomButton;
