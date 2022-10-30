import { SentenceType } from "@/interfaces"
import { createContext } from "react"
import { IQuestionsState } from '@/context';

export interface IQuestionsContext extends IQuestionsState {
    startGame: () => void
    checkQuestion: (input: string) => void
    setGame: (status: 'START' | 'END') => void
}

export const QuestionsContext = createContext({} as IQuestionsContext)