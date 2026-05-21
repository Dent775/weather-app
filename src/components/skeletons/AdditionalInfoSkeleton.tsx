import Card from '../cards/Cards'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function AdditionalInfoSkeleton({ }: Props) {
    return (
        <Card title="Additional Weather Info" childrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {
                Array.from({ length: 8 }).map((_, index) => (
                    <div className='flex justify-between' key={index}>
                        <div className='flex gap-4'>
                            <Skeleton className='w-20 h-8' />
                            <Skeleton className='size-8 rounded-full' />
                        </div>
                        <span>
                            <Skeleton className='size-8' />
                        </span>
                    </div>
                ))
            }
        </Card>)
}