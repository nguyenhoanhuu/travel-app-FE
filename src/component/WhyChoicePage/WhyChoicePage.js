import { faBlenderPhone, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '~/component/WhyChoicePage/WhyChoicePage.module.scss';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from '../Image';
const cx = classNames.bind(styles);
const data = [
   {
      id: 1,
      icon: <Image src={'https://cdn-icons-png.flaticon.com/128/3195/3195114.png'}></Image>,
      title: 'Mạng bán tour',
      description: 'Đầu tiên tại Việt Nam Ứng dụng công nghệ mới nhất',
   },
   {
      id: 2,
      icon: <Image src={'https://cdn-icons-png.flaticon.com/128/3195/3195105.png'}></Image>,
      title: 'Sản phẩm & Dịch vụ',
      description: 'Đa dạng – Chất lượng – An toàn',
   },
   {
      id: 3,
      icon: <Image src={'https://cdn-icons-png.flaticon.com/128/3195/3195051.png'}></Image>,
      title: 'Giá cả',
      description: 'Luôn có mức giá tốt nhất',
   },
   {
      id: 4,
      icon: <Image src={'https://cdn-icons-png.flaticon.com/128/3195/3195109.png'}></Image>,
      title: 'Đặt tour',
      description: 'Dễ dàng & nhanh chóng chỉ với 3 bước',
   },
   {
      id: 5,
      icon: <Image src={'https://cdn-icons-png.flaticon.com/128/4632/4632501.png'}></Image>,
      title: 'Thanh toán',
      description: 'An toàn & linh hoạt',
   },
   {
      id: 6,
      icon: <Image src={'https://cdn-icons-png.flaticon.com/128/5315/5315605.png'}></Image>,
      title: 'Hỗ trợ',
      description: 'Hotline & trực tuyến (08h00 - 22h00)',
   },
];
function WhyChoicePage() {
   return (
      <div className={cx('wrapper')}>
         {data.map((item) => {
            return (
               <div className={cx('why-item')} key={item.id}>
                  <Card cover={<i className={cx('why-icon')}>{item.icon}</i>} bordered>
                     {window.innerWidth > 712 && (
                        <Meta
                           title={item.title}
                           description={item.description}
                           style={{ color: '#2d4271', fontSize: '1.35rem' }}
                        ></Meta>
                     )}
                  </Card>
               </div>
            );
         })}
      </div>
   );
}

export default WhyChoicePage;
