import { FormInstance } from 'antd';
import { Rule } from 'antd/es/form';
import { Fields, useRules } from 'src/shared/lib/formValidation/useRules';
import { FieldType } from '../types/fields';

export const useProfilePwdRules = (form: FormInstance<FieldType>) => {
  const getRules = useRules();
  return (field: keyof FieldType): Rule[] => {
    const rules: Record<keyof FieldType, Rule[]> = {
      password: getRules(Fields.password),
      newPassword: getRules(Fields.password),
      confirm: [
        { required: true, message: 'Please confirm your password' },
        {
          validator: (_, value, callback) => {
            if (value && value !== form.getFieldValue('newPassword')) {
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
