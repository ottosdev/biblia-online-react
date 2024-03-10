import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/apresentation/components/ui/table.tsx";
import { Skeleton } from "@/apresentation/components/ui/skeleton.tsx";

export function ListaSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-[40px] w-32 rounded-md" />
      <div className="flex items-center py-4">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-[32px] w-[16rem] rounded-md" />
          <Skeleton className="h-[32px] w-[16rem] rounded-md" />
          <Skeleton className="h-[32px] w-[16rem] rounded-md" />
        </div>
        <Skeleton className="h-[40px] w-32 rounded-md" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nome do livro</TableHead>
              <TableHead>Abreviação</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 2 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-3" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Skeleton className="h-[20px] w-40 rounded-md" />
        </div>
        <div className="space-x-2 flex">
          <Skeleton className="h-[32px] w-20 rounded-md" />
          <Skeleton className="h-[32px] w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
