import { useEffect, useState } from 'react'
import { getPageByName } from '@/api/notion'
import { INotionPage } from '@/interfaces'

export function useGetNotionPage(name: string) {
    const [data, setData] = useState<INotionPage | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<{ message: string, status: number } | undefined>()

    useEffect(() => {
        setIsLoading(true)
        getPageByName(name)
            .then((page) => {
                setData(page)
            })
            .catch((err) => {
                const { data, status } = err?.response
                setError({
                    message: data?.message,
                    status
                })
            })
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (data) {
            document.title = data?.meta?.properties?.Name?.title[0]?.plain_text
        }
    }, [data])

    return {
        data,
        error,
        isLoading
    }
}