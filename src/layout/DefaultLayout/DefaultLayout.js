import classNames from 'classnames/bind';
import styles from '~/layout/DefaultLayout/DefaultLayout.module.scss';
import Header from '~/pages/Header/Header';
import images from '~/assets/image';

function DefaultLayout({ children, background }) {
   const cx = classNames.bind(styles);
   return (
      <div className={cx('wrapper')}>
         {background ? <Header background={images.backgroundHeader}></Header> : <Header></Header>}

         {children}
      </div>
   );
}

export default DefaultLayout;
