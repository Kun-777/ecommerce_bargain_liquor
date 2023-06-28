import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const VerifyEmail = () => {
  const { auth } = useAuth();
  const [html, setHtml] = useState({ __html: '' });
  const location = useLocation();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    const verifyEmail = async () => {
      await axiosPrivate
        .post('/verify_email')
        .then((response) => {
          setHtml({ __html: response.data });
        })
        .catch((error) => {
          alert(error.response.data.detail);
        });
    };
    if (!auth?.accessToken) {
      verifyRefreshToken();
    }
    verifyEmail();
  }, []);

  return auth.access_token ? (
    <div dangerouslySetInnerHTML={html} />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default VerifyEmail;
