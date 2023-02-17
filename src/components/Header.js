import main_logo from '../images/logo/main_logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={main_logo} alt="Логотип сайта с названием проекта" className="header__logo" />
    </header>
  );
}

export default Header;
