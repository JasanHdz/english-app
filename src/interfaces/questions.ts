export interface IQuestion {
    interrogative   : string
    affirmative     : string
    negative        : string
}

export type SentenceType = keyof IQuestion