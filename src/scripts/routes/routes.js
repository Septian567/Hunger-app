import Detail from '../views/pages/detailPage';
import Favorite from '../views/pages/favoritePage';
import Home from '../views/pages/mainPage';

const routes = {
  '/': Home,
  '/home': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
