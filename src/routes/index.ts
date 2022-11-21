import { lazy } from "react"
import { IRoute } from "@/interfaces"
import { LearnPaths, PracticePaths, SystemPaths } from './paths'

const Main = lazy(() => import('@/pages/Main'))
const TopicSlug = lazy(() => import('@/pages/topic/Slug'))
const Practice = lazy(() => import('@/pages/practice/Practice'))
const SimplePresent = lazy(() => import('@/pages/practice/SimplePresent'))
const Cards = lazy(() => import('@/pages/cards/Cards'))
const Profile = lazy(() => import('@/pages/Profile'))

const { TOPIC, HOME } = LearnPaths
const { PRACTICE, SIMPLE_PRESENT } = PracticePaths
const { CARDS, PROFILE } = SystemPaths

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
    {
        component: Profile,
        path: PROFILE,
    },
]