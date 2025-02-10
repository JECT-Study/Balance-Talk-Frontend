import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = (defaultPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage =
    parseInt(searchParams.get('page') || `${defaultPage}`, 10) || 1;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setSearchParams(
      (prevParams) => ({
        ...Object.fromEntries(prevParams.entries()),
        page: page.toString(),
      }),
      { replace: true },
    );
  }, [page, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return { page, handlePageChange };
};

export default usePagination;
