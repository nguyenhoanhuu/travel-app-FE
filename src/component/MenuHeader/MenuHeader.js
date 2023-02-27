import classNames from 'classnames/bind';
import styles from '~/component/MenuHeader/MenuHeader.module.scss';
import MenuItem from './MenuItem/MenuItem';

const data = [
   {
      parentTitle: 'Du Lịch',
      icon: '',
      children: [
         {
            childrenTitle: 'Tour Miền Bắc',
            link: '/',
         },
         {
            childrenTitle: 'Tour Miền Nam',
            link: '/',
         },
         {
            childrenTitle: 'Tour Miền Trung',
            link: '/',
         },
         {
            childrenTitle: 'Tour Miền Tây Nam bộ ',
            link: '/',
         },
      ],
   },
   {
      parentTitle: 'Vận Chuyển',
      icon: '',
      children: [
         {
            childrenTitle: 'Tour Miền Bắc',
            link: '/',
         },
         {
            childrenTitle: 'Tour Miền Nam',
            link: '/',
         },
         {
            childrenTitle: 'Tour Miền Trung',
            link: '/',
         },
         {
            childrenTitle: 'Tour Miền Tây Nam bộ ',
            link: '/',
         },
      ],
   },
   {
      parentTitle: 'Khuyến mãi',
      icon: '',
      children: [
         {
            childrenTitle: 'Tour Miền Bắc',
         },
         {
            childrenTitle: 'Tour Miền Nam',
         },
         {
            childrenTitle: 'Tour Miền Trung',
         },
         {
            childrenTitle: 'Tour Miền Tây Nam bộ ',
         },
      ],
   },
   {
      parentTitle: 'Liên hệ',
      icon: '',
      children: [],
   },
   {
      parentTitle: 'Tin tức',
      icon: '',
      children: [
         {
            childrenTitle: 'Cẩm nang du lịch',
            link: '/travel-news',
         },
         {
            childrenTitle: 'Tin tức du lịch',
            link: '/travel-guide',
         },
      ],
   },
];

function MenuHeader() {
   const cx = classNames.bind(styles);

   return (
      <div className={cx('container')}>
         <div className={cx('menu-list')}>
            {data.map((item, index) => {
               if (item.children.length <= 0) {
                  return <MenuItem data={item} key={index} hasIcon={false}></MenuItem>;
               } else {
                  return <MenuItem data={item} key={index} hasIcon={true}></MenuItem>;
               }
            })}
         </div>
      </div>
   );
}

export default MenuHeader;
