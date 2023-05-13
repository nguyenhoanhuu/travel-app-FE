import Button from '~/component/Button';
import classNames from 'classnames/bind';
import styles from '~/component/MenuHeader/MenuHeader.module.scss';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '~/component/Popper/Wrapper.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MenuItem({ data, hasIcon }) {
   const navigate = useNavigate();
   const cx = classNames.bind(styles);
   const handleSearchTourByField = (link) => {
      navigate('/search-page', { state: { link: link } });
   };
   const renderItem = () => {
      return (
         <div className={cx('sub-menu')}>
            {data.children.map((item, index) => {
               return <Button onClick={() => handleSearchTourByField(item.link)}>{item.childrenTitle}</Button>;
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
            <div>
               <Tippy
                  delay={[0, 200]}
                  interactive
                  offset={[-10, 20]}
                  arrow="true"
                  placement="bottom-start"
                  render={renderResult}
               >
                  <span className={cx('menu-item')} style={{ padding: '15px' }}>
                     <Button rightIcon={hasIcon && <span className={cx('arrow-down')}></span>}>
                        {data.parentTitle}
                     </Button>
                  </span>
               </Tippy>
            </div>
         ) : (
            <span className={cx('menu-item')}>
               <Link to={data.link}>
                  <Button rightIcon={hasIcon && <span className={cx('arrow-down')} small={true}></span>}>
                     {data.parentTitle}
                  </Button>
               </Link>
            </span>
         )}
      </>
   );
}
export default MenuItem;
