export interface Address {
  id: number;
  street: string;
  number: string;
  suburbId: number;
  city: string;
  isSelected: boolean; // exists only on FE
  isDefault: boolean;
}

// 3: alterar o BE para incluir propriedade isDefault no Address - Done
// TODO: propriedade isSelected existe apenas no FE, pois nao ha necessidade de registrar isso no BE.
