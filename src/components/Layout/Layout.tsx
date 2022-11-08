import { LayoutType } from '@/interfaces';
import { SideBar, Navbar } from '../UI';
import Wrapper from './Wrapper';

export function Layout({ children, type }: { children: JSX.Element, type?: LayoutType }) {
    switch (type) {
        case 'APP':
            return (
                <>
                    <Navbar />
                    <Wrapper style={{ gridTemplateColumns: 'min-content 1fr' }}>
                        {children}
                    </Wrapper>
                </>
            )
        case 'LEARN':
            return (
                <>
                    <Navbar />
                    <Wrapper className='grid my-4' style={{ gridTemplateColumns: 'min-content 1fr' }}>
                        <SideBar />
                        <div>
                            {children}
                        </div>
                    </Wrapper>
                </>
            )
        default:
            return children;
    }
}