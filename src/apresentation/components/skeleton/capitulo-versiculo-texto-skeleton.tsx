import { Skeleton } from "../ui/skeleton";

export default function CapituloVersiculoTextoSkeleton() {
  return (
    <div className="flex gap-2 flex-col flex-wrap mt-2">
      {Array.from({ length: 10 }).map(() => (
        <div className="flex">
          <Skeleton className="w-[600px] h-[16px]" />
        </div>
      ))}
    </div>
  );
}
