import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation()

    return (
        <h4>{t('Home Page')}</h4>
    )
}

export default HomePage