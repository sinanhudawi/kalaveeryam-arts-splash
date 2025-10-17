import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntroSplash } from '@/components/IntroSplash';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    setShowSplash(false);
    navigate('/home');
  };

  if (showSplash) {
    return <IntroSplash onComplete={handleSplashComplete} />;
  }

  return null;
};

export default Index;
