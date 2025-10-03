import { useRooms } from '../../hooks/useRooms';
import RoomList from '../../components/pages/diagnosis/rooms/RoomList';
import { useMemo } from 'react';

export default function RoomsPage() {
  const {
    rooms,
    pagination,
    isLoading,
    isFetching,
    error,
    refetch,
    queryParams,
    handlePaginationChange,
  } = useRooms();

  const columns = useMemo(() => [
    {
      title: 'Room ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
    },
    // Add more columns as needed based on your room data structure
  ], []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <RoomList
        rooms={rooms}
        pagination={pagination}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
        queryParams={queryParams}
        handlePaginationChange={handlePaginationChange}
        columns={columns}
      />
    </div>
  );
}