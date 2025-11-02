import { useState, useEffect } from 'react';

// Squidex configuration - Update these with your actual values
const SQUIDEX_APP_NAME = 'platform'; // Fixed to use correct app name
const SQUIDEX_CLIENT_ID = import.meta.env.VITE_SQUIDEX_CLIENT_ID || 'platform:platform-cms';
const SQUIDEX_CLIENT_SECRET = import.meta.env.VITE_SQUIDEX_CLIENT_SECRET || '4tcz1yi7yusapvyyuqfiqjdodgkqxiiyoxafkcyapkgx';
const SQUIDEX_URL = import.meta.env.VITE_SQUIDEX_URL || 'https://squidex.thepk.in';

// Get access token from Squidex
const getSquidexToken = async () => {
  try {
    const tokenUrl = `${SQUIDEX_URL}/identity-server/connect/token`;
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SQUIDEX_CLIENT_ID,
        client_secret: SQUIDEX_CLIENT_SECRET,
        scope: 'squidex-api',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Squidex token:', error);
    throw error;
  }
};

// Fetch articles from Squidex
const fetchSquidexArticles = async () => {
  try {
    const token = await getSquidexToken();
    
    // Try the regular API first, then fallback to flat if needed
    const apiUrl = `${SQUIDEX_URL}/api/content/${SQUIDEX_APP_NAME}/blog`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const useCMS = () => {
  const [latestArticle, setLatestArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from Squidex first
        const articles = await fetchSquidexArticles();
        
        if (articles.length > 0) {
          // Get the latest article (first in the list)
          const article = articles[0];
          
          // Helper function to convert Squidex rich text JSON to HTML
          const convertRichTextToHTML = (contentObj) => {
            if (typeof contentObj === 'string') return contentObj;
            if (!contentObj || typeof contentObj !== 'object') return '';
            
            // Handle nested structure
            if (contentObj.iv) {
              return convertRichTextToHTML(contentObj.iv);
            }
            
            // Handle rich text document structure
            if (contentObj.type === 'doc' && contentObj.content) {
              return contentObj.content.map(convertNodeToHTML).join('');
            }
            
            return '';
          };
          
          // Convert individual nodes to HTML
          const convertNodeToHTML = (node) => {
            if (!node || !node.type) return '';
            
            switch (node.type) {
              case 'paragraph':
                const paragraphContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<p>${paragraphContent}</p>`;
                
              case 'text':
                let text = node.text || '';
                if (node.marks) {
                  node.marks.forEach(mark => {
                    switch (mark.type) {
                      case 'bold':
                        text = `<strong>${text}</strong>`;
                        break;
                      case 'italic':
                        text = `<em>${text}</em>`;
                        break;
                      case 'underline':
                        text = `<u>${text}</u>`;
                        break;
                      case 'code':
                        text = `<code>${text}</code>`;
                        break;
                      case 'link':
                        text = `<a href="${mark.attrs?.href || '#'}" target="_blank" rel="noopener noreferrer">${text}</a>`;
                        break;
                    }
                  });
                }
                return text;
                
              case 'bulletList':
                const listItems = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<ul>${listItems}</ul>`;
                
              case 'orderedList':
                const orderedItems = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<ol>${orderedItems}</ol>`;
                
              case 'listItem':
                const itemContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<li>${itemContent}</li>`;
                
              case 'heading':
                const headingContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                const level = node.attrs?.level || 1;
                return `<h${level}>${headingContent}</h${level}>`;
                
              case 'image':
                const imageSrc = node.attrs?.src || '';
                const imageAlt = node.attrs?.alt || '';
                const imageTitle = node.attrs?.title || '';
                const imageAlign = node.attrs?.align || 'center';
                
                let imageStyle = 'max-width: 100%; height: auto; margin: 2rem auto; display: block;';
                
                if (imageAlign === 'left') {
                  imageStyle = 'max-width: 50%; height: auto; margin: 0 1.5rem 1rem 0; float: left;';
                } else if (imageAlign === 'right') {
                  imageStyle = 'max-width: 50%; height: auto; margin: 0 0 1rem 1.5rem; float: right;';
                }
                
                return `<img src="${imageSrc}" alt="${imageAlt}" title="${imageTitle}" style="${imageStyle}" />`;
                
              case 'hardBreak':
                return '<br>';
                
              case 'codeBlock':
                const codeContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                const language = node.attrs?.language || '';
                return `<pre><code class="language-${language}">${codeContent}</code></pre>`;
                
              case 'blockquote':
                const quoteContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<blockquote>${quoteContent}</blockquote>`;
                
              case 'horizontalRule':
                return '<hr>';
                
              case 'table':
                const tableContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">${tableContent}</table>`;
                
              case 'tableRow':
                const rowContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<tr>${rowContent}</tr>`;
                
              case 'tableCell':
                const cellContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<td style="border: 1px solid var(--border-color); padding: 0.5rem;">${cellContent}</td>`;
                
              case 'tableHeader':
                const headerContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
                return `<th style="border: 1px solid var(--border-color); padding: 0.5rem; font-weight: bold;">${headerContent}</th>`;
                
              default:
                // Handle unknown node types gracefully
                if (node.content) {
                  return node.content.map(convertNodeToHTML).join('');
                }
                return '';
            }
          };
          
          setLatestArticle({
            id: article.id,
            title: article.data?.title?.iv || 'Untitled',
            content: convertRichTextToHTML(article.data?.content?.iv) || 'No content available',
            excerpt: article.data?.excerpt?.iv || '',
            author: article.data?.author?.iv || 'Unknown',
            publishDate: article.data?.publishDate?.iv || article.lastModified || article.created,
            slug: article.data?.slug?.iv || '',
            tags: article.data?.tags?.iv || [],
            featuredImage: article.data?.featuredImage?.iv || null,
            status: article.data?.status?.iv || article.status || 'draft',
            created: article.created,
            lastModified: article.lastModified
          });
        } else {
          // Fallback to mock data if no articles found
          const mockArticle = {
            id: 1,
            title: "Welcome to My Dashboard",
            content: `
              <p>This is a sample article to demonstrate the dashboard functionality.</p>
              <p>Your Squidex connection is working! No articles found in the 'blog' schema.</p>
              <p>To add blog posts:</p>
              <ul>
                <li>Go to your Squidex admin panel</li>
                <li>Create blog posts in the 'blog' schema</li>
                <li>Add fields like: title, content, author</li>
                <li>Refresh this page</li>
              </ul>
              <p><strong>Squidex URL:</strong> ${SQUIDEX_URL}</p>
              <p><strong>App Name:</strong> ${SQUIDEX_APP_NAME}</p>
            `,
            publishedAt: new Date().toISOString(),
            author: "Pradhyuman"
          };
          setLatestArticle(mockArticle);
        }
      } catch (err) {
        console.error('CMS Error:', err);
        setError(`Failed to load articles: ${err.message}`);
        
        // Show mock data on error with connection info
        const mockArticle = {
          id: 1,
          title: "Squidex Connection Error",
          content: `
            <p>There was an error connecting to Squidex.</p>
            <p><strong>Error:</strong> ${err.message}</p>
            <p><strong>Squidex URL:</strong> ${SQUIDEX_URL}</p>
            <p><strong>App Name:</strong> ${SQUIDEX_APP_NAME}</p>
            <p><strong>Client ID:</strong> ${SQUIDEX_CLIENT_ID}</p>
            <p>Please check your Squidex configuration and ensure:</p>
            <ul>
              <li>The app exists in Squidex</li>
              <li>The 'blog' schema is created</li>
              <li>Client credentials are correct</li>
              <li>The API is accessible</li>
            </ul>
          `,
          publishedAt: new Date().toISOString(),
          author: "Pradhyuman"
        };
        setLatestArticle(mockArticle);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticle();
  }, []);

  return {
    latestArticle,
    loading,
    error
  };
};

// Export for potential future use
export const cmsService = {
  async fetchArticles() {
    // Placeholder for fetching all articles
    return [];
  },
  
  async fetchArticleById(id) {
    // Placeholder for fetching specific article
    return null;
  },
  
  async fetchCategories() {
    // Placeholder for fetching categories
    return [];
  }
};

// Export the fetch function for use in other components
export { fetchSquidexArticles };
