import { useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useTransition, animated } from "react-spring";
import Wrapper from "@/components/Layout/Wrapper"
import { Button, ProgressBar, TextArea } from "@/components/UI"
import { applySentenceColor } from "@/utils/applySentenceColor"
import { QuestionsContext } from '../context/questions/QuestionsContext';
import { useInputValue } from '@/hooks/useInputValue';

function SimplePresent() {
    const { currentQuestion, questionType, startGame, responseType, checkQuestion, victories, percentage, status, setGame } = useContext(QuestionsContext)
    const textArea = useInputValue()
    const navigate = useNavigate()

    const transitions = useTransition(victories, {
        from: { opacity: -1, },
        enter: { opacity: 1, },
        leave: { opacity: -1, },
        delay: 200,
        default: false,
        config: { duration: 1200 }
    })

    useEffect(startGame, [])

    useEffect(() => {
        if (status === 'END') {
            navigate('/', { replace: true })
        }
    }, [status])

    return (
        transitions((props) => (
            <animated.div className="absolute inset-0" style={{ ...props }}>
                <Wrapper className="grid gap-6 absolute inset-0" style={{ gridTemplateRows: 'min-content 1fr min-content' }}>
                    <ProgressBar progress={percentage} action={() => {
                        navigate('/')
                    }} />
                    <div>
                        <h1 className="mb-4">Write this in spanish</h1>
                        <h3 className="underline text-orange-400">Simple present:</h3>
                        <p className="mb-4 text-xs font-sans font-bold">Respond in mode: {responseType}</p>
                        <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: applySentenceColor(currentQuestion[questionType], ['does', 'do', 'i', 'he', 'she', 'it', 'we', 'you', 'they']) }} ></h2>
                        <TextArea placeholder="Write the answer in English" value={textArea.value} onChange={textArea.onChange} />
                    </div>
                    <div className="grid gap-2 self-end">
                        <Button variant="secondary">I can't listen now</Button>
                        <Button onClick={() => {
                            checkQuestion(textArea.value)
                            textArea.clear()
                        }}>Check</Button>
                    </div>
                </Wrapper>
            </animated.div >
        ))
    )
}

export default SimplePresent
