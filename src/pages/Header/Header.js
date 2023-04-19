import classNames from 'classnames/bind';
import MenuHeader from '~/component/MenuHeader/MenuHeader';
import styles from '~/pages/Header/Header.module.scss';
import Search from './../../component/Search/index';
import Image from '~/component/Image';
import images from '~/assets/image';
import { Link, useLocation } from 'react-router-dom';
import Profile from '../admin/layout/MainLayout/Header/HeaderContent/Profile';

function Header({ background }) {
   const location = useLocation();
   const cx = classNames.bind(styles);
   return (
      <>
         <div className={cx('container')}>
            <Link to={'/'}>
               <img className={cx('logo-header')} src={images.logoPage} alt="logo-Xuan" />
            </Link>
            <MenuHeader></MenuHeader>

            {/* <Search></Search> */}
            <div className={cx('header-content')}>
               {window.innerWidth <= 908 ? (
                  <Link to={'/search-Page'}>
                     <div className={cx('btn-search')}>
                        <i className="bi bi-search fa-2x"></i>
                     </div>
                  </Link>
               ) : (
                  <Search></Search>
               )}
               {/* <Link to={'/login'} state={{ history: location.pathname }}>
                  <Image
                     className={cx('avatarUser')}
                     src="https://firebasestorage.googleapis.com/v0/b/appchatzala.appspot.com/o/131612336_213277233589172_5906471642504483128_o.jpg?alt=media&token=ea2d5012-9b17-4cfe-b94c-88d93827ac3a"
                  />
               </Link> */}
               <Profile state={{ history: location.pathname }} />
            </div>
         </div>
         {background && <Image className={cx('background')} src={background} fallback={images.backgroundBackup} />}
      </>
   );
}

export default Header;
