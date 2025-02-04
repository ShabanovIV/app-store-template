import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../api/errors/useErrorHandler';
import { IRenderItem } from '../ui/RenderList/IRenderItem';

const PAGE_SIZE = 10;

export interface PaginatedResponse<T> {
  data: T[];
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

export const usePaginatedData = <T>(
  fetchFunction: (
    arg: { pagination: { pageSize: number; pageNumber: number } },
    options: { skip: boolean },
  ) => {
    data?: PaginatedResponse<T>;
    isFetching: boolean;
    isLoading: boolean;
    error?: unknown;
    refetch: () => void;
  },
  convertItem: (item: T, navigate: (path: string) => void) => IRenderItem,
) => {
  const loadedPages = useRef<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<IRenderItem[]>([]);
  const { data, isFetching, isLoading, error, refetch } = fetchFunction(
    {
      pagination: { pageSize: PAGE_SIZE, pageNumber: pageNumber },
    },
    { skip: pageNumber === 0 || loadedPages.current.includes(pageNumber) },
  );

  useErrorHandler({ error });

  const navigate = useNavigate();

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
      setItems((prev) => [...prev, ...data.data.map((item) => convertItem(item, navigate))]);
    } else if (data && data.data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [data, pageNumber]);

  return {
    isFetching,
    hasMore,
    items,
    refetch,
    handleLastItem,
  };
};
