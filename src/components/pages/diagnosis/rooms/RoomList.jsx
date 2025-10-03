import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, RefreshCw } from 'lucide-react';

export default function RoomList({
  rooms = [],
  pagination,
  isLoading,
  isFetching,
  error,
  refetch,
  queryParams,
  handlePaginationChange,
  columns,
  initialLimit = 10,
}) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-5 space-y-4">
        <p className="text-red-500">Error: {error.message}</p>
        <Button onClick={refetch} disabled={isFetching}>
          {isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-5">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading rooms...</span>
      </div>
    );
  }

  const totalPages = pagination?.totalPages || 1;
  const currentPage = queryParams?.page || 1;
  const currentLimit = queryParams?.limit || initialLimit;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <TableRow key={room.id}>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{room[column.dataIndex]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={String(currentLimit)}
            onValueChange={(value) => handlePaginationChange(1, Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={currentLimit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[initialLimit, initialLimit * 2, initialLimit * 3, initialLimit * 4].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePaginationChange(currentPage - 1, currentLimit)}
                disabled={currentPage <= 1 || isFetching}
              />
            </PaginationItem>
            {pageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => handlePaginationChange(pageNumber, currentLimit)}
                  isActive={pageNumber === currentPage}
                  disabled={isFetching}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePaginationChange(currentPage + 1, currentLimit)}
                disabled={currentPage >= totalPages || isFetching}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}