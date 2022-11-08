import { useParams } from 'react-router-dom'
import { useGetNotionPage } from '@/hooks/useRequest'
import { RenderBlock } from '@/components/UI/RenderBlock'
import { NotFound } from '../NotFound'

function Slug() {
    const { topic = '' } = useParams()
    const { error, data, isLoading } = useGetNotionPage(topic)

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return <NotFound message={`Page not found: ${error.status}`} />
    }

    return (
        <>
            {/* <h1 className='mb-4 text-4xl'>{data?.meta?.properties?.Name?.title[0]?.plain_text}</h1> */}
            {data?.blocks.map((block, index) => (
                <RenderBlock
                    key={index}
                    index={index}
                    block={block}
                    blocks={data?.blocks}
                />
            ))}
        </>
    )
}

export default Slug