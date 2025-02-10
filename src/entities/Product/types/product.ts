export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  category: {
    id: string;
  };
  commandId: string;
};

export type ProductFilters = {
  name?: string;
  ids?: string[];
  categoryIds?: string[];
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
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
};

export type UpdateBody = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
};

export type Result = {
  data: Product[];
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
