import { IQuestionsState } from './QuestionsProvider'
import { IQuestion, SentenceType } from '@/interfaces'

type AuthActionType =
    | { type: 'NEXT_QUESTION', payload: { question: IQuestion, type: SentenceType, responseType: SentenceType } }
    | { type: 'SUCCESS_QUESTION' }
    | { type: 'SET_GAME', payload: 'END' | 'START' }
    | { type: 'START' }

export function questionsReducer(state: IQuestionsState, action: AuthActionType): IQuestionsState {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...state,
        questions: [],
        victories: 0,
        status: action.payload,
        percentage: 0,
      }
    case 'NEXT_QUESTION':
        return {
          ...state,
          currentQuestion: action.payload.question,
          questionType: action.payload.type,
          responseType: action.payload.responseType,
          questions: [...state.questions, action.payload.question],
        }
    case 'SUCCESS_QUESTION':
      const victories = state.victories + 1
      return {
        ...state,
        victories,
        percentage: victories * (100 / state.maxQuestions)
      }
    default:
        return state
  }
}