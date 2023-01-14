import classNames from 'classnames/bind';
import styles from '~/component/MenuHeader/MenuHeader.module.scss';
import MenuItem from './MenuItem/MenuItem';

const data = [
   {
      parentTitle: 'du lịch',
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
      parentTitle: 'vận chuyển',
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
