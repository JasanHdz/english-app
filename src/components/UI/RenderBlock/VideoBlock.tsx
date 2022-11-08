import { Block } from '@/interfaces'
import { getYoutubeIdByUrl } from '@/utils/getUrl'

interface Props {
    block: Block
}

export function VideoBlock({ block }: Props) {
    const { external } = block.video
    if (external.url) {
        const id = getYoutubeIdByUrl(external.url)
        return (
            <div className='aspect-video my-2'>
                <iframe
                    className='w-full h-full'
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        )
    }
    return (
        <div>
            video sin procesar en frontend
        </div>
    )
}