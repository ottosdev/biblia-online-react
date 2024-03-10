import { Skeleton } from "../ui/skeleton";

export default function CapitulosCardSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map(() => (
        <div>
          <Skeleton className="w-[200px] h-[100px] flex flex-wrap" />
        </div>
      ))}
    </>
  );
}
