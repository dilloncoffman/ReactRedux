import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
// Need to use ESLint statement below, test for ManageCoursePage uses a disconnected named export to test the ManageCoursePage whereas the actual component exports a connected container component for Redux, this import is correct here for a default export
// eslint-disable-next-line import/no-named-as-default
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
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}
