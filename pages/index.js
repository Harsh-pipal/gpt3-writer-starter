import Head from 'next/head';
import Image from 'next/image';

import { useState } from 'react';
const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);



  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
    console.log(userInput)

  }


  const callRefine = async () => {
    setIsRefining(true);
    
    console.log("Calling OpenAI...");

    const response = await fetch('/api/refine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({ userInput}),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsRefining(false);
  }

  // console.log(userInput)
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Tweet Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Tweet Generator</h1>
          </div>

          <div className="header-subtitle">
            <h2>Insert the topic of your Tweet</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="Eg. Layoffs in 2023"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
        
   
        <div className="temp">
          <a
            className={isGenerating ? 'generate-button loading prompt-buttons' : 'generate-button prompt-buttons'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate prompt-buttons">
              {isGenerating ? <span className="loader prompt-buttons"></span> : <p>Generate</p>}
            </div>
          </a>
   
          <a
            className={isRefining ? 'generate-buttonr loadingr prompt-buttonsr ' : 'generate-buttonr prompt-buttonsr'}
            onClick={callRefine}
          >
            <div className="generater prompt-buttonsr">
              {isRefining ? <span className="loaderr prompt-buttonsr"></span> : <p>Refine</p>}
            </div>
          </a>
        </div>

      
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Home;
