import { Rule } from 'antd/es/form';
import { FieldType } from '../types/fields';

export type AllowedFields = Exclude<
  keyof FieldType,
  'id' | 'desc' | 'oldPrice' | 'price' | 'categoryId'
>;

export const getProductRules = (field: AllowedFields) => {
  const rules: Record<AllowedFields, Rule[]> = {
    name: [
      { required: true, message: 'Please enter a name' },
      { min: 3, max: 20, message: 'Name must be between 3 and 20 characters' },
      {
        pattern: /^[a-zA-Z0-9\s]+$/,
        message: 'Name can only contain letters, numbers, and spaces',
      },
    ],
    photo: [
      {
        pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
        message: 'Invalid photo URL',
        validateTrigger: 'onSubmit',
      },
    ],
  };

  return rules[field];
};
