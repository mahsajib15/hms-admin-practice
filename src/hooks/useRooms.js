import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryStates } from 'nuqs';
import api from '../lib/api';

export function useRooms(initialLimit = 10) {
  const [queryParams, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(initialLimit),
  });

  const fetchRooms = async () => {
    const response = await api.get('/api/v1/rooms', {
      params: queryParams,
    });
    return response.data;
  };

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['rooms', queryParams.page, queryParams.limit],
    queryFn: fetchRooms,
    keepPreviousData: true,
  });

  const handlePaginationChange = (page, pageSize) => {
    setParams({
      page: page,
      limit: pageSize,
    });
  };

  return {
    rooms: data?.rooms || [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    error,
    refetch,
    queryParams,
    handlePaginationChange,
  };
}