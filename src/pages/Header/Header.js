import classNames from 'classnames/bind';
import MenuHeader from '~/component/MenuHeader/MenuHeader';
import styles from '~/pages/Header/Header.module.scss';
import Search from './../../component/Search/index';
import Image from '~/component/Image';
import images from '~/assets/image';
import { Link } from 'react-router-dom';
function Header({ background }) {
   const cx = classNames.bind(styles);
   return (
      <>
         <div className={cx('container')}>
            <img className={cx('logo-header')} src={images.logoPage} alt="logo-Xuan" />
            <MenuHeader></MenuHeader>

            <Search></Search>
            <Link to={'/login'}>
               <Image
                  className={cx('avatarUser')}
                  src="https://firebasestorage.googleapis.com/v0/b/appchatzala.appspot.com/o/131612336_213277233589172_5906471642504483128_o.jpg?alt=media&token=ea2d5012-9b17-4cfe-b94c-88d93827ac3a"
               />
            </Link>
         </div>
         {background && <Image className={cx('background')} src={background} fallback={images.backgroundBackup} />}
      </>
   );
}

export default Header;
