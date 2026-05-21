import { Skeleton } from '../ui/skeleton';
import SideCardSkeleton from './SideCardSkeleton';

type Props = {}

export default function SidePanelSkeleton({ }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Air Pollution</h1>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">AQI</h1>

                </div>
                <Skeleton className='size-7' />
            </div>

            {Array.from({ length: 8 }).map((_, index) =>
                <SideCardSkeleton
                    key={index}
                />
            )}
        </div>
    );
}