import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes/PageRoute';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import routers from './Config/router';

function App() {
   return (
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
