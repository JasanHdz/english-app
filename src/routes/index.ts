import { lazy } from "react"
import { IRoute } from "@/interfaces"
import { LearnPaths, PracticePaths, CardsPaths } from './paths'

const Main = lazy(() => import('@/pages/Main'))
const TopicSlug = lazy(() => import('@/pages/topic/Slug'))
const Practice = lazy(() => import('@/pages/practice/Practice'))
const SimplePresent = lazy(() => import('@/pages/practice/SimplePresent'))
const Cards = lazy(() => import('@/pages/cards/Cards'))

const { TOPIC, HOME } = LearnPaths
const { PRACTICE, SIMPLE_PRESENT } = PracticePaths
const { CARDS } = CardsPaths

export const routes: IRoute[] = [
    {
        component: Main,
        path: HOME,
    },
    {
        component: TopicSlug,
        path: TOPIC,
    },
    {
        component: Practice,
        path: PRACTICE,
    },
    {
        component: SimplePresent,
        path: SIMPLE_PRESENT,
        layout: 'PRACTICE',
    },
    {
        component: Cards,
        path: CARDS,
    },
]