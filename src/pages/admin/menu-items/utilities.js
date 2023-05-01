// assets
import {
   AppstoreAddOutlined,
   AntDesignOutlined,
   BarcodeOutlined,
   BgColorsOutlined,
   FontSizeOutlined,
   LoadingOutlined,
} from '@ant-design/icons';

// icons
const icons = {
   FontSizeOutlined,
   BgColorsOutlined,
   BarcodeOutlined,
   AntDesignOutlined,
   LoadingOutlined,
   AppstoreAddOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
   id: 'utilities',
   title: 'Utilities',
   type: 'group',
   children: [
      {
         id: 'util-typography',
         title: 'Tour',
         type: 'item',
         url: '/tour',
         icon: icons.FontSizeOutlined,
      },
      {
         id: 'util-color',
         title: 'Booking',
         type: 'item',
         url: '/booking',
         icon: icons.BgColorsOutlined,
      },
      {
         id: 'util-shadow',
         title: 'Shadow',
         type: 'item',
         url: '/shadow',
         icon: icons.BarcodeOutlined,
      },
      {
         id: 'ant-icons',
         title: 'Ant Icons',
         type: 'item',
         url: '/icons/ant',
         icon: icons.AntDesignOutlined,
         breadcrumbs: false,
      },
   ],
};

export default utilities;
