import {
  DialogFooter,
} from "@/apresentation/components/ui/dialog";
import { Skeleton } from "@/apresentation/components/ui/skeleton.tsx";

export function ModalSkeleton() {
  return (
    <>
      <form>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-1 items-center">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 items-center">
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="grid grid-cols-1 items-center">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 items-center">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <DialogFooter>
          <Skeleton className="h-10 w-32" />
        </DialogFooter>
      </form>
    </>
  );
}
