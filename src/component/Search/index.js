// import AccountItem from '~/component/AccountItem';
import HeaderlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faL } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

// import * as searchService from '~/services/searchService';
import style from './Search.module.scss';
import { SearchIcon } from '~/component/Icons';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDebounce } from '~/Hooks';
import Wrapper from '~/component/Popper/Wrapper.js';
const cx = classNames.bind(style);
function Search() {
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [loading, setLoading] = useState(false);

   const searchRef = useRef();
   // const debouncedValue = useDebounce(searchValue, 500);

   // useEffect(() => {
   //    if (!debouncedValue.trim()) {
   //       setSearchResult('');
   //       return;
   //    }

   //    const fetchApi = async () => {
   //       setLoading(true);
   //       const result = await searchService.search(debouncedValue);
   //       setSearchResult(result);
   //       setLoading(false);
   //    };
   //    fetchApi();
   // }, [debouncedValue]);

   const HandleClear = () => {
      setSearchValue('');

      searchRef.current.focus();
      setSearchResult('');
   };
   const handleHideResult = () => {
      setShowResult(false);
   };
   // ko cho dấu cách ở đầu ô input
   const handleChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ') || searchValue.trim()) {
         setSearchValue(searchValue);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   };
   return (
      // Using a wrapper <div>tag around the reference element solves this by creating a new parentNode context.
      <div>
         <HeaderlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <Wrapper>
                     <h4 className={cx('search-title')}>Accounts</h4>
                     {/* {searchResult.length > 0 &&
                        // cần tối ưu lại khi sử dụng vòng map (sử dụng useMemo tránh render lại searchValue)
                        searchResult.map((value) => {
                           // return <AccountItem key={value.id} data={value} onClick={() => handleHideResult(false)} />;
                        })} */}
                  </Wrapper>
               </div>
            )}
            onClickOutside={handleHideResult}
         >
            <div className={cx('search')}>
               <input
                  ref={searchRef}
                  value={searchValue}
                  placeholder="search accounts and video"
                  spellCheck={false}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                  onFocus={() => {
                     setShowResult(true);
                  }}
               />
               {!!searchValue && !loading && (
                  <button className={cx('clear')}>
                     <FontAwesomeIcon icon={faCircleXmark} onClick={HandleClear} />
                  </button>
               )}
               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
               <button className={cx('search-btn')} onMouseDown={(e) => handleSubmit(e)}>
                  <SearchIcon />
               </button>
            </div>
         </HeaderlessTippy>
      </div>
   );
}

export default Search;
