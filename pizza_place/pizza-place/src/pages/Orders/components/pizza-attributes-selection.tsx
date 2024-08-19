import { PizzaCrust } from '../../PizzaCrusts/types/pizza-crust';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { PizzaFlavour } from '../../PizzaFlavours/type/pizza-flavour';

function PizzaAttributesSelectionSection(props: {
  title: string;
  description: string;
  numberOfSelectionAllowed: number;
  selectedOptions: PizzaCrust[] | PizzaFlavour[] | undefined;
  options: PizzaCrust[] | PizzaFlavour[];
  onDelete: (optionId: number) => void;
  onSelection: (option: any) => void;
}) {
  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ marginTop: 2 }}
      >
        {props.title}
      </Typography>
      {props.selectedOptions && props.selectedOptions.length ? (
        props.selectedOptions.map((option) => (
          <Chip
            key={option.id}
            label={option.name}
            onDelete={() => props.onDelete(option.id)}
            style={{ marginTop: 12 }}
          />
        ))
      ) : props.options && props.options.length ? (
        <p>{props.description}</p>
      ) : (
        ''
      )}

      <div
        className="flex flex-wrap mt-4 w-8/12"
        style={{ overflow: 'hidden' }}
      >
        {props.options && props.options.length ? (
          props.options.map((option: PizzaCrust | PizzaFlavour) => (
            <Chip
              key={option.id}
              label={option.name}
              sx={{ margin: 0.5 }}
              variant="outlined"
              onClick={() => props.onSelection(option)}
            />
          ))
        ) : (
          <p>No options registered. Please add at least one.</p>
        )}
      </div>
    </>
  );
}

export default PizzaAttributesSelectionSection;
