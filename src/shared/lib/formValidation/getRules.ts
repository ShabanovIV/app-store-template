import { Rule } from 'antd/es/form';

export const Fields = {
  email: 'email',
  password: 'password',
} as const;

export type Field = (typeof Fields)[keyof typeof Fields];

export const getRules = (field: Field) => {
  const rules: Record<Field, Rule[]> = {
    email: [
      { required: true, message: 'Please input your email' },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Please enter a valid email address',
      },
    ],
    password: [{ required: true, message: 'Please enter your password' }],
  };

  return rules[field];
};
