import { lazy } from "react"
import { IRoute } from "@/interfaces"
import { PracticePaths } from './paths'

const Main = lazy(() => import('@/pages/Main'))
const SimplePresent = lazy(() => import('@/pages/SimplePresent'))

const { SIMPLE_PRESENT, FUTURE_SIMPLE, PRONOUNS } = PracticePaths

export const routes: IRoute[] = [
    {
        component: Main,
        path: '/'
    },
    {
        component: SimplePresent,
        path: SIMPLE_PRESENT
    },
    {
        component: null,
        path: FUTURE_SIMPLE
    },
    {
        component: null,
        path: PRONOUNS
    },
]