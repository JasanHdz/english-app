import { config } from '@/config'
import axios from 'axios'
import { INotionPage } from '../interfaces/notion';

const notionApi = axios.create({
    baseURL: config.notionURL,
})

export function getPageByName(name: string): Promise<INotionPage> {
    return notionApi.get('/api/notion', { params: { name } })
        .then((res) => {
            const data = res?.data?.data
            if (res.status >= 400) {
                throw new Error(res.data?.message)
            }
            return data
        })
}