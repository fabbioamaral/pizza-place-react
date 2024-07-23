export type ModalPropsType = {
  title?: string;
  description?: string;
  isOpen: boolean;
  onAction: any; // when clicking on buttons such as 'Save', 'Create', 'Update', etc
  onDismiss: () => void; // when clicking on 'Dismiss' button
  onClose: () => void; // when modal actually closes
  data?: any;
};
