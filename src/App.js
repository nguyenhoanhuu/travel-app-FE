import { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes/PageRoute';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import Admin from './pages/admin/index';
function App() {
   const [isAdmin, setIsAdmin] = useState(false);
   const role = localStorage.getItem('role');
   useLayoutEffect(() => {
      if (role != null) {
         if (role === 'employee') {
            setIsAdmin(true);
            // console.log(window.location.pathname);
            if (window.location.pathname !== '/admin') {
               window.location.href = '/admin';
            }
         } else {
            setIsAdmin(false);
         }
      }
   }, [role]);
   return isAdmin ? (
      <Admin></Admin>
   ) : (
      <Router>
         <div>
            <Routes>
               {publicRouter.map((router, index) => {
                  const Page = router.component;
                  let Layout = DefaultLayout;
                  if (router.layout) {
                     Layout = router.layout;
                  } else if (router.layout === null) {
                     Layout = Fragment;
                  }
                  return (
                     <Route
                        key={index}
                        path={router.path}
                        element={
                           <Layout background={router.background}>
                              <Page />
                           </Layout>
                        }
                     ></Route>
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}
export default App;
