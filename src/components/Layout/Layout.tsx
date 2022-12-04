import { LayoutType } from '@/interfaces';
import { SideBar, Navbar } from '../UI';
import Wrapper from './Wrapper';

export function Layout({ children, type }: { children: JSX.Element, type?: LayoutType }) {
    switch (type) {
        case 'APP':
            return (
                <>
                    <Navbar />
                    <Wrapper className='flex py-0 sm:my-4'>
                        <SideBar />
                        <div className='flex-1'>
                            {children}
                        </div>
                    </Wrapper>
                </>
            )
        default:
            return children;
    }
}