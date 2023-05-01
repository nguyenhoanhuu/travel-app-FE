import classNames from 'classnames/bind';
import styles from '~/component/PointOfLocation/PointOfLocation.module.scss';
const cx = classNames.bind(styles);
const data = [
   {
      url: 'https://media.travel.com.vn/destination/dc_211105_Canh%20Quan%20Quy%20Nhon%20(1).jpg',
   },
   {
      url: 'https://media.travel.com.vn/destination/dc_211105_Ky%20Co%201%20(4).jpg',
   },
   {
      url: 'https://media.travel.com.vn/destination/dc_211010_PHU%20YEN%20-%20NHA%20THO%20MANG%20LANG.jpg',
   },
   {
      url: 'https://media.travel.com.vn/destination/dc_211105_Canh%20Quan%20Quy%20Nhon%20(1).jpg',
   },
   {
      url: 'https://media.travel.com.vn/destination/dc_211010_GANH%20DA%20DIA.jpg',
   },
];
function PointOfLocation({ listImage = data, title, align, num }) {
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx(align)}>{title}</h2>
         <div className={cx('listImage')}>
            {listImage.slice(0, num).map((item, index) => {
               return (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img style={{ width: `${100 / num - 1}%` }} className={cx('image')} key={index} src={item.url}></img>
               );
            })}
         </div>
      </div>
   );
}

export default PointOfLocation;
