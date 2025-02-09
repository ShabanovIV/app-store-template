import { FormInstance, Rule } from 'antd/es/form';
import { Fields, getRules } from 'src/shared/lib/formValidation/getRules';
import { FieldType } from '../types/fields';

export const getSignUpRules = (field: keyof FieldType, form: FormInstance<FieldType>) => {
  const rules: Record<keyof FieldType, Rule[]> = {
    email: getRules(Fields.email),
    password: getRules(Fields.password),
    confirm: [
      { required: true, message: 'Please confirm your password' },
      {
        validator: (_, value, callback) => {
          if (value && value !== form.getFieldValue('password')) {
            callback('Passwords do not match');
          } else {
            callback();
          }
        },
      },
    ],
  };

  return rules[field];
};
