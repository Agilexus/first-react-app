import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { publicRoutes, privateRoutes } from '../router/routes';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
        {isAuth ? (
          <>
            {privateRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
                exact={route.exact}
              />
            ))}
            <Route path="/login" element={<Navigate to="/posts" />} />
            <Route key="/error" path="*" element={<Navigate to="/error" />} />
          </>
        ) : (
          <>
            {publicRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
                exact={route.exact}
              />
            ))}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    );
  };

export default AppRouter

{/* 
<Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/error" element={<Error />} />
        <Route path="/posts/:id" element={<PostIdPage />} />

Використовуємо компонент Navigate для перенаправлення 
        <Route path="/" element={<Navigate to="/posts" />} />

Додатковий "запасний" Route для неправельних URL 
        <Route path="*" element={<Navigate to="/error" />} /> 
        
*/}