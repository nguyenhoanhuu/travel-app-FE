// assets
import {
   AppstoreAddOutlined,
   AntDesignOutlined,
   BarcodeOutlined,
   BgColorsOutlined,
   FontSizeOutlined,
   LoadingOutlined,
   SaveOutlined,
   LineChartOutlined,
} from '@ant-design/icons';

// icons
const icons = {
   FontSizeOutlined,
   BgColorsOutlined,
   BarcodeOutlined,
   AntDesignOutlined,
   LoadingOutlined,
   AppstoreAddOutlined,
   SaveOutlined,
   LineChartOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
   id: 'utilities',
   title: 'quản lý',
   type: 'group',
   children: [
      {
         id: 'util-typography',
         title: 'Tour du lịch',
         type: 'item',
         url: '/tour',
         icon: icons.FontSizeOutlined,
      },
      {
         id: 'util-color',
         title: 'Đặt tour',
         type: 'item',
         url: '/booking',
         icon: icons.BgColorsOutlined,
      },
      {
         id: 'util-shadow',
         title: 'Voucher',
         type: 'item',
         url: '/voucher',
         icon: icons.BarcodeOutlined,
      },
      {
         id: 'ant-icons',
         title: 'Khuyến mãi tour',
         type: 'item',
         url: '/promotion',
         icon: icons.AntDesignOutlined,
         breadcrumbs: false,
      },
      {
         id: 'option1',
         title: 'Các yêu cầu đặt tour',
         type: 'item',
         url: '/requestTour',
         icon: icons.SaveOutlined,
         breadcrumbs: false,
      },
      {
         id: 'option2',
         title: 'Hướng dẫn viên du lịch',
         type: 'item',
         url: '/tourGuide',
         icon: icons.LineChartOutlined,
         breadcrumbs: false,
      },
      {
         id: 'option3',
         title: 'Option_3',
         type: 'item',
         url: '/option3',
         icon: icons.LineChartOutlined,
         breadcrumbs: false,
      },
      {
         id: 'option4',
         title: 'Option_4',
         type: 'item',
         url: '/option4',
         icon: icons.LineChartOutlined,
         breadcrumbs: false,
      },
   ],
};

export default utilities;
