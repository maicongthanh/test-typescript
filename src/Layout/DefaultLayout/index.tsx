import Header from './Header'

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

const DefaultLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div className='container'>{children}</div>
        </>
    )
}

export default DefaultLayout