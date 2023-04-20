import classNames from 'classnames/bind';
import styles from '~/component/PointOfDepartureFavorite/PointOfDepartureFavoriteItem/PointOfDepartureFavoriteItem.module.scss';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChurch } from '@fortawesome/free-solid-svg-icons';
import Meta from 'antd/es/card/Meta';
import { color } from '@mui/system';
import Image from '~/component/Image/Image';
import { data } from '~/assets/data/tinh-tp';
const cx = classNames.bind(styles);
function PointOfDepartureFavoriteItem({ data }) {
   const showListCard = () => {
      return (
         <div className={cx('infor-background')}>
            <Image className={cx('image')} src={data.image} alt="image1" srcSet="" />
            <span className={cx('icon')}>
               <FontAwesomeIcon size="3x" icon={faChurch}></FontAwesomeIcon>
            </span>
         </div>
      );
   };
   return (
      <div className={cx('wrapper')}>
         <Card style={{ width: 300, margin: 'auto' }} hoverable cover={showListCard()}>
            <Meta
               style={{ textAlign: 'left', color: '#2d4271', fontSize: '1.35rem' }}
               title={data.destination}
               description="www.instagram.com"
            />
         </Card>
      </div>
   );
}

export default PointOfDepartureFavoriteItem;
