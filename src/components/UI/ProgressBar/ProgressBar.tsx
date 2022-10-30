import { XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
    progress: number
    action?: () => void
}

export default function ProgressBar({ progress = 0, action }: Props) {
    return (
        <div className='flex gap-5 items-center h-fit'>
            <button onClick={action} className='relative w-4 h-4'>
                <XMarkIcon className='w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500' />
            </button>
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-400 h-full rounded-lg " style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}
