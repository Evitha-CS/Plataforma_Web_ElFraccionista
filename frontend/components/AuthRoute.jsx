import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const AuthRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
  
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  return isAuthenticated ? children : null;
};

export default AuthRoute;