import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface DataTableSearchProps<TData> {
  table: Table<TData>;
  columnsDictionary: Map<string, string>;
}

export function DataTableSearch<TData>({
  table,
  columnsDictionary,
}: DataTableSearchProps<TData>) {
  return (
    <div className="flex gap-2">
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .map((column) => (
          <div className="flex" key={column.id}>
            <Input
              type="text"
              className="form-control rounded-end bg-light border-light"
              placeholder={`Pesquisar por ${
                columnsDictionary.get(column.id)
                  ? columnsDictionary.get(column.id)
                  : "livro"
              }`}
              value={
                (table.getColumn(column.id)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(column.id)?.setFilterValue(event.target.value)
              }
            />
          </div>
        ))}
    </div>
  );
}
