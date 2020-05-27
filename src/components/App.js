import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import ManageCoursePage from './courses/ManageCoursePage';

export default function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        {/* Declare more specific route first */}
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}
