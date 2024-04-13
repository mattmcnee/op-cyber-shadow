import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ref, get } from 'firebase/database';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import './markdown.css';
import FlipCard from '/src/worksheet/FlipCard';

const MarkdownRenderer = ({ content, user, database, nullUser }) => {
  
  // missing content

  const sanitizeHtmlContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const tagsToRemove = ['script', 'button', 'input', 'select', 'textarea', 'form'];
    tagsToRemove.forEach(tag => {
      const elements = doc.getElementsByTagName(tag);
      while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    });

    return doc.body.innerHTML;
  };
  
  function markMathsExpressions(content) {
    // Regular expression to match inline math: $...$
    const mathRegex = /\$(\$?)\n?(.*?)\n?\1\$/g;
    let newContent = content;
    const inlineMathMatches = content.match(mathRegex);

    let localEquationList = [...equationsList];

    if (inlineMathMatches) {
      inlineMathMatches.forEach((match, index) => {
        localEquationList.push(match);

        const buttonHtml = `<<${localEquationList.length - 1}>>${match}`;
        newContent = newContent.replaceAll(match, buttonHtml);
      });

      // After processing all matches, update the equations list state once
      setEquationsList(localEquationList);
    }
    return newContent;
  }

  function addButtonsByRegex(children) {
    const modifiedChildren = [];
    var pastChild = null;
    // Use capturing groups in the regex to extract the number inside << >>
    var linkRegex = /<<(\d+)>>/g;

    React.Children.toArray(children).forEach((child, index) => {
      const childStr = typeof child === 'string' ? child : child.toString();

      // Reset regex's last index property to ensure we start from the beginning of the string
      linkRegex.lastIndex = 0;
      const match = linkRegex.exec(pastChild);
      if (match) {
        // Log the value inside << >> from pastChild
        // console.log("Value in pastChild:", match[1]); // match[1] contains the first capturing group

        // If past child matches, wrap current child in a button
        modifiedChildren.push(<button className="katex-button" onClick={() => handleMathClick(match[1], child)} key={index}>{child}</button>);
      } else {
        // In the else block, check if the current child matches the regex. If not, add it to the array
        const cleanedChild = typeof child === 'string' ? child.replace(linkRegex, '') : child;
        if (cleanedChild) { // Check if the cleanedChild is not an empty string after replacement
          modifiedChildren.push(cleanedChild);
        }
      }
      pastChild = childStr;
    });

    return modifiedChildren;
  }

  // missing content

  return (
    <>
      <ReactMarkdown
        // missing content
      />
      {showMathsHelper &&
        <MathsHelper 
          // missing content
        />
      }
    </>
  );
};

export default MarkdownRenderer;
