import classNames from 'classnames/bind';
import styles from '~/component/PointOfDepartureFavorite/PointOfDepartureFavoriteItem/PointOfDepartureFavoriteItem.module.scss';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChurch } from '@fortawesome/free-solid-svg-icons';
import Meta from 'antd/es/card/Meta';
import { color } from '@mui/system';
const cx = classNames.bind(styles);
const showListCard = () => {
   return (
      <div className={cx('infor-background')}>
         <img
            className={cx('image')}
            src="https://media.tacdn.com/media/attractions-content--1x-1/0b/18/9a/2c.jpg"
            alt="image1"
            srcSet=""
         />
         <span className={cx('icon')}>
            <FontAwesomeIcon size="3x" icon={faChurch}></FontAwesomeIcon>
         </span>
      </div>
   );
};
function PointOfDepartureFavoriteItem() {
   return (
      <div className={cx('wrapper')}>
         <Card style={{ width: 300 }} hoverable cover={showListCard()}>
            <Meta
               style={{ textAlign: 'left', color: '#2d4271', fontSize: '1.35rem' }}
               title="Europe Street beat"
               description="www.instagram.com"
            />
         </Card>
      </div>
   );
}

export default PointOfDepartureFavoriteItem;
