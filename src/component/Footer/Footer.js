import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from '~/component/Footer/Footer.module.scss';
import { Image } from 'antd';
import images from '~/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
const cx = classNames.bind(styles);
const dataImage = [
   {
      index: 1,
      url: 'https://mobirise.com/extensions/travelm4/assets/images/010.jpg',
   },
   {
      index: 2,
      url: 'https://mobirise.com/extensions/travelm4/assets/images/054.jpg',
   },
   {
      index: 3,
      url: 'https://mobirise.com/extensions/travelm4/assets/images/065.jpg',
   },
   {
      index: 4,
      url: 'https://mobirise.com/extensions/travelm4/assets/images/043.jpg',
   },
   {
      index: 5,
      url: 'https://mobirise.com/extensions/travelm4/assets/images/032.jpg',
   },
   {
      index: 6,
      url: 'https://mobirise.com/extensions/travelm4/assets/images/021.jpg',
   },
];
function Footer() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('company-infor')}>
            <h2 className={cx('company-infor-title')}>Slogan</h2>
            <p className={cx('company-infor-description')}>
               Dành cho những người yêu thích du lịch và muốn khám phá thế giới xung quanh mình
            </p>
            <Link to={'/login'}>
               <Image className={cx('avatarUser')} preview={false} src={images.logoPage} />
            </Link>
         </div>
         <div className={cx('company-contact')}>
            <h2 className={cx('company-contact-title')}>Liên hệ</h2>
            <div className={cx('list-contact')}>
               <div className={cx('contact-item')}>
                  <FontAwesomeIcon icon={faUser} className={cx('contact-icon')}></FontAwesomeIcon>
                  <p className={cx('contact-item-description')}>Hoàng Hoa Thuấn-19493771</p>
               </div>
               <div className={cx('contact-item')}>
                  <FontAwesomeIcon icon={faUser} className={cx('contact-icon')}></FontAwesomeIcon>
                  <p className={cx('contact-item-description')}>Nguyễn Hoàn Hữu-19521741</p>
               </div>
               <div className={cx('contact-item')}>
                  <FontAwesomeIcon icon={faLocationDot} className={cx('contact-icon')}></FontAwesomeIcon>
                  <p className={cx('contact-item-description')}>Đại Học Công Nghiệp TP.HCM</p>
               </div>
            </div>
            <div className={cx('social-media-channel')}>
               <div className={cx('soc-item')}>
                  <Image preview={false} src={'https://img.icons8.com/windows/30/ffffff/google-plus.png'}></Image>
               </div>
               <div className={cx('soc-item')}>
                  <Image
                     preview={false}
                     src={'https://img.icons8.com/material-outlined/30/ffffff/instagram-new--v2.png'}
                  ></Image>
               </div>
               <div className={cx('soc-item')}>
                  <Image preview={false} src={'https://img.icons8.com/ios-glyphs/30/ffffff/twitter--v1.png'}></Image>
               </div>
               <div className={cx('soc-item')}>
                  <Image preview={false} src={'https://img.icons8.com/ios-glyphs/30/ffffff/skype.png'}></Image>
               </div>
               <div className={cx('soc-item')}>
                  <Image preview={false} src={'https://img.icons8.com/ios-glyphs/30/ffffff/facebook-f.png'}></Image>
               </div>
            </div>
         </div>
         <div className={cx('recent-trip')}>
            <h2 className={cx('recent-trip-title')}>Địa điểm nổi bật</h2>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 3, sm: 12, md: 12 }}>
               {dataImage.map((item, index) => (
                  <Grid item xs={1} sm={2} md={4} key={index}>
                     <Image src={item.url} className={cx('recent-trip-image')}></Image>
                  </Grid>
               ))}
            </Grid>
         </div>
      </div>
   );
}

export default Footer;
