export const getPairCards = <T = any>(firstType: string, secondType: string, list: T[]) => ({
    [firstType]: list,
    [secondType]: list,
})