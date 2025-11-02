import React from 'react';
import ArticleDisplay from '../components/ArticleDisplay';
import { useCMS } from '../services/cmsService';

const Home = () => {
  const { latestArticle, loading, error } = useCMS();

  return (
    <div className="home-page">
      <ArticleDisplay 
        article={latestArticle} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default Home;
