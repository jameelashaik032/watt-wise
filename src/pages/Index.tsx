import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
};

export default Index;
