import { Rule } from 'antd/es/form';
import { FieldType } from '../types/fields';

export type AllowedFields = Exclude<keyof FieldType, 'email' | 'signUpDate'>;

export const getProfileRules = (field: AllowedFields): Rule[] => {
  const rules: Record<AllowedFields, Rule[]> = {
    name: [
      { required: true, message: 'Please enter your username' },
      { min: 3, max: 20, message: 'Username must be between 3 and 20 characters' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Username can only contain letters, numbers, and underscores',
      },
    ],
  };

  return rules[field];
};
