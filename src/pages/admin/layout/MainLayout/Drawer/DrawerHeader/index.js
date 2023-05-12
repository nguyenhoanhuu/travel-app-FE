import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '~/pages/admin/components/Logo';
import { Link } from 'react-router-dom';
import images from '~/assets/image';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
   const theme = useTheme();

   return (
      // only available in paid version
      <DrawerHeaderStyled theme={theme} open={open}>
         <Stack direction="row" spacing={1} alignItems="center">
            {/* <Logo /> */}
            <Link to={'/admin'}>
               <img
                  style={{ height: '50px', float: 'left', cursor: 'pointer', width: '160px' }}
                  src={images.backgroundHeader2}
                  alt="logo-Xuan"
               />
            </Link>
         </Stack>
      </DrawerHeaderStyled>
   );
};

DrawerHeader.propTypes = {
   open: PropTypes.bool,
};

export default DrawerHeader;
