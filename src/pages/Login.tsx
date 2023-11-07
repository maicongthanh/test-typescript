import { useTranslation } from 'react-i18next';

const Login = () => {

    const { t } = useTranslation()

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder={t('username')} />
                    <input type="password" placeholder={t('password')} />
                    <button>login</button>
                    <p className="message">{t('Not registered')}? <a href="#">{t('Create an account')}</a></p>
                </form>
            </div>
        </div>

    )
}

export default Login