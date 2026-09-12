/**
 * Utility functions for converting Squidex rich text format to HTML
 * This module provides reusable functions for converting complex rich text
 * content objects to properly formatted HTML
 */

/**
 * Escapes a value for use inside a double-quoted HTML attribute.
 * The output of this module goes through dangerouslySetInnerHTML, so an
 * unescaped quote in a CMS field would let an author inject markup.
 */
const escapeAttr = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Strips control characters, DEL, and whitespace. These can be used to
// disguise a scheme, e.g. "java	script:alert(1)".
const stripInvisible = (input) =>
  input
    .split('')
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code > 32 && code !== 127;
    })
    .join('');

/**
 * Allows only URLs that navigate. Blocks javascript:, data:, and vbscript:,
 * which would otherwise execute when the link is clicked.
 */
const safeUrl = (value) => {
  const url = String(value ?? '').trim();
  if (!url) return '#';
  const normalised = stripInvisible(url).toLowerCase();
  if (/^(javascript|data|vbscript):/.test(normalised)) return '#';
  return escapeAttr(url);
};

/**
 * Converts a rich text content object to HTML string
 * @param {Object|String} contentObj - The rich text object or string to convert
 * @returns {String} HTML representation of the content
 */
export const convertRichTextToHTML = (contentObj) => {
  if (typeof contentObj === 'string') return contentObj;
  if (!contentObj || typeof contentObj !== 'object') return '';

  if (contentObj.iv) {
    return convertRichTextToHTML(contentObj.iv);
  }

  if (contentObj.type === 'doc' && contentObj.content) {
    return contentObj.content.map(convertNodeToHTML).join('');
  }

  return '';
};

/**
 * Converts a single rich text node to HTML
 * @param {Object} node - The node to convert
 * @returns {String} HTML representation of the node
 */
export const convertNodeToHTML = (node) => {
  if (!node || !node.type) return '';

  switch (node.type) {
    case 'paragraph': {
      const paragraphContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<p>${paragraphContent}</p>`;
    }

    case 'text': {
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
              text = `<a href="${safeUrl(mark.attrs?.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
              break;
            default:
              // Handle other mark types gracefully
              break;
          }
        });
      }
      return text;
    }

    case 'bulletList': {
      const listItems = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<ul>${listItems}</ul>`;
    }

    case 'orderedList': {
      const orderedItems = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<ol>${orderedItems}</ol>`;
    }

    case 'listItem': {
      const itemContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<li>${itemContent}</li>`;
    }

    case 'heading': {
      const headingContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      // Clamped: an arbitrary value would emit tags like <h99> or worse.
      const level = Math.min(6, Math.max(1, parseInt(node.attrs?.level, 10) || 1));
      return `<h${level}>${headingContent}</h${level}>`;
    }

    case 'image': {
      const imageSrc = safeUrl(node.attrs?.src);
      const imageAlt = escapeAttr(node.attrs?.alt);
      const imageTitle = escapeAttr(node.attrs?.title);
      const imageAlign = node.attrs?.align || 'center';

      let imageStyle = 'max-width: 100%; height: auto; margin: 2rem auto; display: block;';

      if (imageAlign === 'left') {
        imageStyle = 'max-width: 50%; height: auto; margin: 0 1.5rem 1rem 0; float: left;';
      } else if (imageAlign === 'right') {
        imageStyle = 'max-width: 50%; height: auto; margin: 0 0 1rem 1.5rem; float: right;';
      }

      return `<img src="${imageSrc}" alt="${imageAlt}" title="${imageTitle}" style="${imageStyle}" />`;
    }

    case 'hardBreak':
      return '<br>';

    case 'codeBlock': {
      const codeContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      // Restricted to a token shape so it cannot break out of the class attribute.
      const language = String(node.attrs?.language || '').replace(/[^a-zA-Z0-9_-]/g, '');
      return `<pre><code class="language-${language}">${codeContent}</code></pre>`;
    }

    case 'blockquote': {
      const quoteContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<blockquote>${quoteContent}</blockquote>`;
    }

    case 'horizontalRule':
      return '<hr>';

    case 'table': {
      const tableContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">${tableContent}</table>`;
    }

    case 'tableRow': {
      const rowContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<tr>${rowContent}</tr>`;
    }

    case 'tableCell': {
      const cellContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<td style="border: 1px solid var(--border-color); padding: 0.5rem;">${cellContent}</td>`;
    }

    case 'tableHeader': {
      const headerContent = node.content ? node.content.map(convertNodeToHTML).join('') : '';
      return `<th style="border: 1px solid var(--border-color); padding: 0.5rem; font-weight: bold;">${headerContent}</th>`;
    }

    default:
      // Handle unknown node types gracefully
      if (node.content) {
        return node.content.map(convertNodeToHTML).join('');
      }
      return '';
  }
};

/**
 * Convert Squidex asset ID to asset URL
 * @param {String|Array} assetData - Asset ID or array containing asset ID
 * @returns {String|null} Asset URL or null
 */
const convertAssetToUrl = (assetData) => {
  if (!assetData) return null;

  // Handle array of assets (Squidex returns arrays for asset fields)
  if (Array.isArray(assetData)) {
    if (assetData.length === 0) return null;
    assetData = assetData[0]; // Get first asset
  }

  // If it's already a URL, return it
  if (typeof assetData === 'string' && assetData.startsWith('http')) {
    return assetData;
  }

  // If it's an object with ID property
  if (typeof assetData === 'object' && assetData?.id) {
    const SQUIDEX_URL = import.meta.env.VITE_SQUIDEX_URL || 'https://squidex.thepk.in';
    const SQUIDEX_APP_NAME = 'platform';
    return `${SQUIDEX_URL}/api/assets/${SQUIDEX_APP_NAME}/${assetData.id}`;
  }

  // If it's just an asset ID string
  if (typeof assetData === 'string') {
    const SQUIDEX_URL = import.meta.env.VITE_SQUIDEX_URL || 'https://squidex.thepk.in';
    const SQUIDEX_APP_NAME = 'platform';
    return `${SQUIDEX_URL}/api/assets/${SQUIDEX_APP_NAME}/${assetData}`;
  }

  return null;
};

/**
 * Process article data from Squidex API to standard format
 * @param {Object} rawArticle - Raw article from API
 * @returns {Object} Processed article with converted content
 */
export const processArticleData = (rawArticle) => {
  // Converted once and reused; this used to run three times per article.
  const content = convertRichTextToHTML(rawArticle.data?.content?.iv) || '';
  const wordCount = countWords(content);

  return {
    id: rawArticle.id,
    title: rawArticle.data?.title?.iv || 'Untitled',
    content: content || 'No content available',
    excerpt: rawArticle.data?.excerpt?.iv || '',
    author: rawArticle.data?.author?.iv || 'Unknown',
    publishDate: rawArticle.data?.publishDate?.iv || rawArticle.lastModified || rawArticle.created,
    slug: rawArticle.data?.slug?.iv || '',
    tags: rawArticle.data?.tags?.iv || [],
    featuredImage: convertAssetToUrl(rawArticle.data?.featuredImage?.iv),
    status: rawArticle.data?.status?.iv || rawArticle.status || 'draft',
    created: rawArticle.created,
    lastModified: rawArticle.lastModified,
    // Additional metadata for complete display
    wordCount,
    readingTime: wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200))
  };
};

/**
 * Count words in HTML content (strips HTML tags)
 * @param {String} html - HTML string
 * @returns {Number} Word count
 */
const countWords = (html) => {
  const text = html.replace(/<[^>]*>/g, '').trim();
  // ''.split(/\s+/) yields [''], so an empty body would otherwise count as 1.
  if (!text) return 0;
  return text.split(/\s+/).length;
};

/**
 * Estimate reading time based on word count
 * Assumes average reading speed of 200 words per minute
 * @param {String} html - HTML string
 * @returns {Number} Reading time in minutes
 */
const estimateReadingTime = (html) => {
  const wordCount = countWords(html);
  return Math.max(1, Math.ceil(wordCount / 200));
};

export default {
  convertRichTextToHTML,
  convertNodeToHTML,
  processArticleData,
  countWords,
  estimateReadingTime
};