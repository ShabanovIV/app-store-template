import { ReactNode } from 'react';

export interface IRenderItem {
  key: string;
  render: () => ReactNode;
}
