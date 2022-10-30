import { Link } from 'react-router-dom'
import Wrapper from '@/components/Layout/Wrapper'
import { PracticePaths } from '@/routes/paths'

function Main() {
    return (
        <Wrapper className='font-sans'>
            <h1>Hello {'{{ USER_NAME }}'}</h1>
            <p className='font-bold mt-10'>List of Topics:</p>
            <ul className='my-3 pl-3 grid gap-2'>
                {Object.entries(PracticePaths).map(([key, value]) => (
                    <li key={key}>
                        <Link to={value}>{key.split('_').join(' ')} { }</Link>
                    </li>
                ))}
            </ul>
        </Wrapper>
    )
}

export default Main