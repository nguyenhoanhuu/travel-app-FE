import classNames from 'classnames/bind';
import styles from '~/component/WhyChoicePage/WhyChoicePage.module.scss';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from '../Image';
import { useState, useEffect } from 'react';
import '~/component/WhyChoicePage/WhyChoicePage.css';
const cx = classNames.bind(styles);

function WhyChoicePage() {
   const [widthCard, setWidthCard] = useState(128);
   const [fontSize, setFontSize] = useState(1.35);

   const detectSize = () => {
      if (window.innerWidth < 712) {
         setWidthCard(64);
      } else {
         setWidthCard(128);
      }
   };
   const data = [
      {
         id: 1,
         icon: <Image src={`https://cdn-icons-png.flaticon.com/${widthCard}/3195/3195114.png`}></Image>,
         title: 'Mạng bán tour',
         description: 'Đầu tiên tại Việt Nam Ứng dụng công nghệ mới nhất',
      },
      {
         id: 2,
         icon: <Image src={`https://cdn-icons-png.flaticon.com/${widthCard}/3195/3195105.png`}></Image>,
         title: 'Sản phẩm & Dịch vụ',
         description: 'Đa dạng – Chất lượng – An toàn',
      },
      {
         id: 3,
         icon: <Image src={`https://cdn-icons-png.flaticon.com/${widthCard}/3195/3195051.png`}></Image>,
         title: 'Giá cả',
         description: 'Luôn có mức giá tốt nhất',
      },
      {
         id: 4,
         icon: <Image src={`https://cdn-icons-png.flaticon.com/${widthCard}/3195/3195109.png`}></Image>,
         title: 'Đặt tour',
         description: 'Dễ dàng & nhanh chóng chỉ với 3 bước',
      },
      {
         id: 5,
         icon: <Image src={`https://cdn-icons-png.flaticon.com/${widthCard}/4632/4632501.png`}></Image>,
         title: 'Thanh toán',
         description: 'An toàn & linh hoạt',
      },
      {
         id: 6,
         icon: <Image src={`https://cdn-icons-png.flaticon.com/${widthCard}/5315/5315605.png`}></Image>,
         title: 'Hỗ trợ',
         description: 'Hotline & trực tuyến (08h00 - 22h00)',
      },
   ];
   useEffect(() => {
      detectSize();
   }, []);
   return (
      <div>
         <h2 className={cx('title')}>Vì sao chọn Vietravel</h2>
         <div className={cx('wrapper')}>
            {data.map((item) => {
               return (
                  <div className={cx('why-item')} key={item.id}>
                     <Card
                        className={cx('why-item-box')}
                        cover={<i className={cx('why-icon')}>{item.icon}</i>}
                        bordered
                     >
                        <Meta
                           title={item.title}
                           description={item.description}
                           style={{ color: '#2d4271', fontSize: `${fontSize}rem` }}
                           className={cx('why-description')}
                        ></Meta>
                     </Card>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default WhyChoicePage;
