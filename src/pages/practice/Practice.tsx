import { PracticePaths } from '@/routes/paths';
import { Link } from 'react-router-dom';

const practiceList = [
    {
        name: 'Simple present',
        link: PracticePaths.SIMPLE_PRESENT
    }
]

function Practice() {
    return (
        <>
            <p className='font-bold'>List of Practice:</p>
            <ul className='my-3 pl-3 grid gap-2'>
                {practiceList.map(({ name, link }, index) => (
                    <li key={index}>
                        <Link to={link}>{name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Practice