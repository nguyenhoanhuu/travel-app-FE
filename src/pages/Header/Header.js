import classNames from 'classnames/bind';
import MenuHeader from '~/component/MenuHeader/MenuHeader';
import styles from '~/pages/Header/Header.module.scss';
import Search from './../../component/Search/index';
import Image from '~/component/Image';
import images from '~/assets/image';
function Header({ background }) {
   const cx = classNames.bind(styles);
   return (
      <>
         <div className={cx('container')}>
            <img
               className={cx('logo-header')}
               src={'https://travel.com.vn/Content/Theme/images/logo-xuan.png'}
               alt="logo-Xuan"
            />
            <MenuHeader></MenuHeader>

            <Search></Search>
            <Image
               className={cx('avatarUser')}
               src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-1/58586775_799049853812842_5990376567757340672_n.jpg?stp=c0.25.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=TgTE7ZhFoewAX8vZNCY&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfBFauT4OJayxPxEbk2fjUUpRaUKB20pYbt5M6l09D7kLw&oe=63DBD9BE"
            />
         </div>
         {background && <Image className={cx('background')} src={background} fallback={images.backgroundBackup} />}
      </>
   );
}

export default Header;
