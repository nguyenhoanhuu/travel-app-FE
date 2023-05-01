import Routes from '~/pages/admin/routes';
import ThemeCustomization from '~/pages/admin/themes';
import { BrowserRouter } from 'react-router-dom';
// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '~/pages/admin/store';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const Admin = () => (
   <ReduxProvider store={store}>
      <BrowserRouter basename="/admin">
         <ThemeCustomization>
            <Routes />
         </ThemeCustomization>
      </BrowserRouter>
   </ReduxProvider>
);

export default Admin;
