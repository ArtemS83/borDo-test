import React from 'react';
import { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from './components/AppBar';
import NewsPage from './pages/NewsPage';
import NewestPage from './pages/NewestPage';
import CommentsPage from './pages/CommentsPage';
import Loader from './components/Loader';

const App = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={NewsPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/newest" component={NewestPage} />
          <Route path="/comments/:newsId" component={CommentsPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
