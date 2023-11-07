import { Link } from 'react-router-dom'
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store';
import { changeLanguage } from '../../redux/reducer/languageSlice';
import { useTranslation } from 'react-i18next';

type languageOption = {
    value: string,
    label: string
}

const options = [
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'en', label: 'English' },
];

const Header = () => {
    const { i18n, t } = useTranslation()
    const dispatch = useDispatch()
    const language = useSelector((state: RootState) => state.language.languageDefault)

    const handleOnChangeLanguage = (e: languageOption) => {
        dispatch(changeLanguage(e))
        i18n.changeLanguage(e.value)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/'>{t('Home')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to='/about'>{t('About')}</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Select
                                options={options}
                                defaultValue={language}
                                onChange={(e) => handleOnChangeLanguage(e!)}
                            />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to='/login'>{t('Login')}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header