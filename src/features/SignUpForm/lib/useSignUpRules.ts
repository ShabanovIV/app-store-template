import { FormInstance, Rule } from 'antd/es/form';
import { Fields, useRules } from 'src/shared/lib/formValidation/useRules';
import { FieldType } from '../types/fields';

export const useSignUpRules = (form: FormInstance<FieldType>) => {
  const getRules = useRules();
  return (field: keyof FieldType): Rule[] => {
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
};
