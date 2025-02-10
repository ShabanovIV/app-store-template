import { Rule } from 'antd/es/form';
import { FieldType } from '../types/fields';

export type AllowedFields = Exclude<keyof FieldType, 'id' | 'desc'>;

export const getProductRules = (field: AllowedFields) => {
  const rules: Record<AllowedFields, Rule[]> = {
    name: [
      { required: true, message: 'Please enter a name' },
      { min: 3, max: 40, message: 'Name must be between 3 and 40 characters' },
    ],
    photo: [
      {
        pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
        message: 'Invalid photo URL',
      },
    ],
    price: [
      { required: true, message: 'Please enter a price' },
      {
        pattern: /^\d+(\.\d{1,2})?$/,
        message: 'Price must be a valid number with up to 2 decimal places',
      },
    ],
    oldPrice: [
      {
        pattern: /^\d+(\.\d{1,2})?$/,
        message: 'Old price must be a valid number with up to 2 decimal places',
      },
    ],
    categoryId: [{ required: true, message: 'Please select a category product' }],
  };

  return rules[field];
};
