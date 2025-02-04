import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from 'src/entities/Category';
import { convertToIRenderItem } from 'src/entities/Category/ui/convertToRenderItem';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { ROUTES } from 'src/shared/config/routes';
import { IRenderItem } from 'src/shared/ui/RenderList/RenderList';

const PAGE_SIZE = 10;

export const useLoaderCategories = () => {
  const loadedPages = useRef<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<IRenderItem[]>([]);
  const { data, isFetching, isLoading, error, refetch } = useGetCategoriesQuery(
    { pagination: { pageSize: PAGE_SIZE, pageNumber: pageNumber } },
    {
      skip: pageNumber === 0 || loadedPages.current.includes(pageNumber),
    },
  );
  const { errorElement } = useErrorHandler({ error });
  const navigate = useNavigate();

  const handleLastItem = useCallback(() => {
    if (!hasMore || isFetching) return;
    setPageNumber((prev) => {
      return prev + 1;
    });
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (isLoading && isFetching) {
      setCategories([]);
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
      setCategories((prev) => [
        ...prev,
        ...data.data.map((category) => {
          return convertToIRenderItem({
            category,
            onClick: () => navigate(`${ROUTES.products.basePath}${category.id}`),
          });
        }),
      ]);
    } else if (data && data.data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [data, pageNumber]);

  return {
    isFetching,
    hasMore,
    categories,
    errorElement,
    refetch,
    handleLastItem,
  };
};
