import Button from '~/component/Button';
import classNames from 'classnames/bind';
import styles from '~/component/MenuHeader/MenuHeader.module.scss';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '~/component/Popper/Wrapper.js';

function MenuItem({ data, hasIcon }) {
   const cx = classNames.bind(styles);

   const renderItem = () => {
      return (
         <div className={cx('sub-menu')}>
            {data.children.map((item, index) => {
               return (
                  <Button className={cx('menu-item')} key={index}>
                     {item.childrenTitle}
                  </Button>
               );
            })}
         </div>
      );
   };
   const renderResult = (attrs) => {
      return (
         <Wrapper className={cx('menu-popper')} tabIndex="-1" {...attrs}>
            <div className={cx('menu-body')}>{renderItem()}</div>
         </Wrapper>
      );
   };

   return (
      <>
         {hasIcon ? (
            <>
               <Tippy
                  // visible={true}
                  delay={[0, 200]}
                  interactive
                  offset={[-10, 20]}
                  arrow="true"
                  placement="bottom-start"
                  render={renderResult}
               >
                  <span className={cx('menu-item')}>
                     <Button rightIcon={hasIcon && <span className={cx('arrow-down')}></span>}>
                        {data.parentTitle}
                     </Button>
                  </span>
               </Tippy>
            </>
         ) : (
            <Button
               className={cx('menu-item')}
               rightIcon={hasIcon && <span className={cx('arrow-down')} small={true}></span>}
            >
               {data.parentTitle}
            </Button>
         )}
      </>
   );
}
export default MenuItem;
