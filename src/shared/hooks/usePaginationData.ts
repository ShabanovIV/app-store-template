import { useCallback, useEffect, useRef, useState } from 'react';
import { useErrorHandler } from '../api/errors/useErrorHandler';
import { IRenderItem } from '../ui/RenderList/IRenderItem';

const PAGE_SIZE = 10;

export interface PaginatedResponse<TData> {
  data: TData[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
}

interface UsePaginationDataProps<TData> {
  fetchFunction: (
    pagination: { pageSize: number; pageNumber: number },
    skip: boolean,
  ) => {
    data?: PaginatedResponse<TData>;
    isFetching: boolean;
    isLoading: boolean;
    error?: unknown;
    refetch: () => void;
  };
  convertItem: (item: TData) => IRenderItem;
}

export const usePaginatedData = <TData>({
  fetchFunction,
  convertItem,
}: UsePaginationDataProps<TData>) => {
  const loadedPages = useRef<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<IRenderItem[]>([]);
  const { data, isFetching, isLoading, error, refetch } = fetchFunction(
    { pageSize: PAGE_SIZE, pageNumber: pageNumber },
    pageNumber === 0 || loadedPages.current.includes(pageNumber),
  );

  useErrorHandler({ error });

  const handleLastItem = useCallback(() => {
    if (!hasMore || isFetching) return;
    setPageNumber((prev) => prev + 1);
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (isLoading && isFetching) {
      setItems([]);
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (
      data &&
      data.data.length > 0 &&
      !loadedPages.current.includes(pageNumber) &&
      data.pagination.pageNumber === pageNumber
    ) {
      loadedPages.current.push(pageNumber);
      setItems((prev) => [...prev, ...data.data.map((item) => convertItem(item))]);
    } else if (data && data.data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [convertItem, data, pageNumber]);

  return {
    isFetching,
    hasMore,
    items,
    refetch,
    handleLastItem,
  };
};
