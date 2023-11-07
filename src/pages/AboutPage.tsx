import { useTranslation } from 'react-i18next';

const AboutPage = () => {

    const { t } = useTranslation()
    return (
        <h4>{t('About Page')}</h4>
    )
}

export default AboutPage