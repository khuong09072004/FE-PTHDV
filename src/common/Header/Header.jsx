import './Header.scss'
import { IconSearch } from '@tabler/icons-react';
import Logo from '../../assets/images/logo.png';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { t } = useTranslation('header')
    const navigate = useNavigate();

    const handleClickSignIn = () => {
        navigate('/signIn')
    }
    const handleClickSignUp = () =>{
        navigate('/signUp')
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <a href="/">
                        <img src={Logo} alt="Logo" className="logo" />
                    </a>
                </div>
                <div className="navbar-search">
                    <input type="text" placeholder={t('header1')} className='search-input' />
                    <button className="search-button">
                        <IconSearch stroke={2} color='white' />
                    </button>
                </div>
                <div className="navbar-buttons">
                    <button className="login-button" onClick={handleClickSignIn}>{t('header2')}</button>
                    <button className="signup-button" onClick={handleClickSignUp}>{t('header3')}</button>
                </div>
            </nav>
        </>
    )
}
export default Header