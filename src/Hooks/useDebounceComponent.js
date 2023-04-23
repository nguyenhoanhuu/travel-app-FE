import { useState, useEffect } from 'react';
function useDebounceComponent(component, delay) {
   useEffect(() => {
      const handler = setTimeout(() => {
         return component;
      }, delay);
      return () => clearTimeout(handler);
   }, [component]);
}
export default useDebounceComponent;
