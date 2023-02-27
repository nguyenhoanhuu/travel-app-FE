import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import classNames from 'classnames/bind';
import styles from '~/pages/SearchPage/SearchPage.module.scss';
const cx = classNames.bind(styles);
function valuetext(value) {
   return `${value}°C`;
}

const minDistance = 10000000;

export default function RangeSlider() {
   const [value1, setValue1] = React.useState([0, 200000000]);

   const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
         return;
      }

      if (activeThumb === 0) {
         setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      } else {
         setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      }
   };

   return (
      <Box sx={{ width: 280 }}>
         <Slider
            min={0}
            max={200000000}
            step={100000}
            getAriaLabel={() => 'Minimum distance'}
            value={value1}
            onChange={handleChange1}
            getAriaValueText={valuetext}
            disableSwap
         />
         <div className={cx('s-title-price')}>{`${value1[0]}đ - ${value1[1]}đ`}</div>
      </Box>
   );
}
