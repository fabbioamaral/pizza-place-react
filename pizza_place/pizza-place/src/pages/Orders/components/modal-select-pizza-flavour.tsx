import Modal from '@mui/material/Modal';
import { ModalPropsType } from '../../../shared/types/modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { PizzaCrust } from '../../PizzaCrusts/types/pizza-crust';
import PizzaAttributesSelectionSection from './pizza-attributes-selection';
import { PizzaFlavour } from '../../PizzaFlavours/type/pizza-flavour';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
import { GET_PIZZA_CRUSTS } from '../../PizzaCrusts/graphql/get-crusts';
import { GET_PIZZA_FLAVOURS } from '../../PizzaFlavours/graphql/get-crusts';

function ModalSelectPizza(props: ModalPropsType) {
  const [selectedCrust, setSelectedCrust] = useState<PizzaCrust[]>();
  const MAX_NUMBER_OF_PIZZA_CRUST = 1;

  const [selectedFlavour, setSelectedFlavour] = useState<PizzaFlavour[]>();
  const MAX_NUMBER_OF_PIZZA_FLAVOUR = 2;

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const crusts: PizzaCrust[] = useQuery(GET_PIZZA_CRUSTS, {
    variables: { size: props.data.pizzaToBeAdded.size },
  }).data?.pizzaCrusts;

  const flavours: PizzaFlavour[] = useQuery(GET_PIZZA_FLAVOURS, {
    variables: { size: props.data.pizzaToBeAdded.size },
  }).data?.pizzaFlavours;

  const handleSelectCrust = (newCrust: PizzaCrust) => {
    const copySelectedCrust: PizzaCrust[] = selectedCrust
      ? JSON.parse(JSON.stringify(selectedCrust))
      : [];

    if (copySelectedCrust.length === MAX_NUMBER_OF_PIZZA_CRUST) {
      copySelectedCrust.pop();
    }
    copySelectedCrust.push(newCrust);
    setSelectedCrust(copySelectedCrust);
  };

  const handleDeleteCrust = (crustId: number) => {
    let copySelectedCrust: PizzaCrust[] = JSON.parse(
      JSON.stringify(selectedCrust)
    );
    copySelectedCrust = copySelectedCrust.filter(
      (crust) => crust.id !== crustId
    );

    setSelectedCrust(copySelectedCrust);
  };

  const handleSelectFlavour = (newFlavour: PizzaFlavour) => {
    const copySelectedFlavour: PizzaFlavour[] = selectedFlavour
      ? JSON.parse(JSON.stringify(selectedFlavour))
      : [];

    if (copySelectedFlavour.length === MAX_NUMBER_OF_PIZZA_FLAVOUR) {
      copySelectedFlavour.pop();
    }
    copySelectedFlavour.push(newFlavour);
    setSelectedFlavour(copySelectedFlavour);
  };

  const handleDeleteFlavour = (flavourId: number) => {
    let copySelectedFlavour: PizzaFlavour[] = JSON.parse(
      JSON.stringify(selectedFlavour)
    );
    copySelectedFlavour = copySelectedFlavour.filter(
      (flavour) => flavour.id !== flavourId
    );

    setSelectedFlavour(copySelectedFlavour);
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Choose Pizza Crust & Flavour
        </Typography>

        <PizzaAttributesSelectionSection
          title="Crust Style"
          description={`Please select ${MAX_NUMBER_OF_PIZZA_CRUST} crust`}
          numberOfSelectionAllowed={MAX_NUMBER_OF_PIZZA_CRUST}
          selectedOptions={selectedCrust}
          options={crusts}
          onDelete={handleDeleteCrust}
          onSelection={handleSelectCrust}
        />

        <PizzaAttributesSelectionSection
          title="Pizza Flavours"
          description={`Please select max of ${MAX_NUMBER_OF_PIZZA_FLAVOUR} flavours`}
          numberOfSelectionAllowed={MAX_NUMBER_OF_PIZZA_FLAVOUR}
          selectedOptions={selectedFlavour}
          options={flavours}
          onDelete={handleDeleteFlavour}
          onSelection={handleSelectFlavour}
        />

        <div className="mt-8">
          <Button
            sx={{ mr: 2 }}
            variant="outlined"
            type="submit"
            onClick={() => {
              props.onAction(
                props.data.pizzaToBeAdded,
                selectedFlavour,
                selectedCrust
              );

              props.onDismiss();
            }}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={props.onDismiss}>
            Dismiss
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalSelectPizza;
