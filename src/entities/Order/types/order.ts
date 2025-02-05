export type Order = {
  id: string;
  products: OrderProduct[];
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  commandId: string;
};

export type OrderProduct = {
  product?: {
    id: string;
    name: string;
    price: number;
    photo?: string;
  };
  quantity: number;
};

export type OrderFilters = {
  productIds?: string[];
  userId?: string;
  ids?: string[];
  status?: OrderStatus;
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string;
    lte?: string;
  };
  updatedAt?: {
    gte?: string;
    lte?: string;
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type CreateBody = {
  products: {
    id: string;
    quantity: number;
  }[];
  status?: OrderStatus;
};

export type UpdateBody = {
  id: string;
  productIds?: string[];
  status?: OrderStatus;
};

export type Result = {
  data: Order[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
};

export enum OrderStatus {
  PendingConfirmation = 'pending_confirmation',
  Processing = 'processing',
  Packaging = 'packaging',
  WaitingForDelivery = 'waiting_for_delivery',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  ReturnRequested = 'return_requested',
  OrderCancelled = 'order_cancelled',
}
