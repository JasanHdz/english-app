export type LayoutType = 'APP' | 'WITH_AUTH' | 'PRACTICE' | 'LEARN'

export interface IRoute {
    title?: string
    component: any
    path: string
    isUnderConstruction?: boolean
    layout?: LayoutType
}