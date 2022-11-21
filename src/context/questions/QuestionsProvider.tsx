import { ReactNode, useReducer } from 'react'
import { QuestionsContext, questionsReducer } from '@/context'
import { IQuestion, SentenceType } from '@/interfaces'
import data from '@/assets/data.json'
import { generateRandomElement } from '@/utils/applySentenceColor'

const types: SentenceType[] = ['affirmative', 'interrogative', 'negative']

const getSentenceTypeNotRepeat = (currentType?: SentenceType): SentenceType => {
    const arr = types.filter((item) => item !== currentType)
    return generateRandomElement(arr) as SentenceType
}

export interface IQuestionsState {
    questions: IQuestion[],
    victories: number
    currentQuestion: IQuestion
    questionType: SentenceType
    responseType: SentenceType
    maxQuestions: number
    status: 'STOP' | 'START' | 'END'
    percentage: number
}

const INITIAL_STATE: IQuestionsState = {
    questions: [],
    currentQuestion: data.simplePresent.questions[0],
    questionType: 'interrogative',
    victories: 0,
    responseType: 'affirmative',
    maxQuestions: data.simplePresent.questions.length,
    percentage: 0,
    status: 'STOP'
}

export function QuestionsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(questionsReducer, INITIAL_STATE)

    const getQuestionNotRepeat = (): void => {
        const question = generateRandomElement(data.simplePresent.questions) as IQuestion
        const type = getSentenceTypeNotRepeat()
        const index = state.questions.findIndex((prev) => prev[type] === question[type])
        if (index !== -1) {
            return getQuestionNotRepeat()
        }
        const responseType = getSentenceTypeNotRepeat(type)
        dispatch({ type: "NEXT_QUESTION", payload: { question, type, responseType } })
    }

    const checkQuestion = (input: string) => {
        if (state.status === 'END') {
            return console.log('juego terminado')
        }
        if (state.currentQuestion[state.responseType].toLowerCase() === input.toLowerCase()) {
            // success
            dispatch({ type: 'SUCCESS_QUESTION' })
            console.log('GANAMOS')
            console.log(state.questions)
            setTimeout(() => {
                if (state.questions.length <= data.simplePresent.questions.length) {
                    if (state.victories >= state.maxQuestions) return dispatch({ type: 'SET_GAME', payload: 'END' })
                    getQuestionNotRepeat()
                }
            }, 800)
        } else {
            console.log(input)
            // message error and nextQuestion
        }
    }

    const setGame = (status: 'START' | 'END') => dispatch({ type: 'SET_GAME', payload: status })

    const startGame = () => {
        getQuestionNotRepeat()
        dispatch({ type: 'SET_GAME', payload: 'START' })
    }

    return <QuestionsContext.Provider value={{
        ...state,
        startGame,
        checkQuestion,
        setGame,
    }}>{children}</QuestionsContext.Provider>
}