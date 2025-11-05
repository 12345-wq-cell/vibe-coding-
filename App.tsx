
import React, { useState, useCallback } from 'react';
import type { GeneratedCode, UploadedImage } from './types';
import { generateWebsiteCode } from './services/geminiService';
import PromptInput from './components/PromptInput';
import CodeOutput from './components/CodeOutput';
import { SparklesIcon } from './components/icons';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar, { Page } from './components/Sidebar';
import IdeaPage from './components/IdeaPage';
import PricingModal from './components/PricingModal';
import ErrorBoundary from './components/ErrorBoundary';

type UserPlan = 'free' | 'basic' | 'pro' | 'business';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [activePage, setActivePage] = useState<Page>('home');
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [pageCredits, setPageCredits] = useState(2);
  const [ideaCredits, setIdeaCredits] = useState(2);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (pageCredits <= 0) {
      setError('You have run out of page generation credits. Please upgrade your plan.');
      setShowPricingModal(true);
      return;
    }
    
    if (!prompt.trim()) {
      setError('Please enter a description for the website.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode(null);

    try {
      const code = await generateWebsiteCode(prompt, uploadedImage);
      setGeneratedCode(code);
      setPageCredits(prev => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? `Failed to generate code: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setUploadedImage(null);
    }
  }, [prompt, uploadedImage, pageCredits]);

  const handleSelectPlan = (plan: 'basic' | 'pro' | 'business') => {
    setUserPlan(plan);
    if (plan === 'basic') {
      setPageCredits(30);
      setIdeaCredits(0);
    } else if (plan === 'pro') {
      setPageCredits(50);
      setIdeaCredits(20);
    } else if (plan === 'business') {
      setPageCredits(80);
      setIdeaCredits(40);
    }
    setShowPricingModal(false);
    setError(null);
  };

  const renderHomePage = () => (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-center">
          <SparklesIcon className="h-12 w-12 text-yellow-400 animate-pulse" />
          <p className="mt-4 text-lg text-gray-300">Building your Vibe...</p>
          <p className="text-sm text-gray-400">This might take a moment.</p>
        </div>
      ) : error ? (
        <div className="w-full max-w-2xl text-center p-8 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
          <p>{error}</p>
           <button 
              onClick={() => { setError(null); if (pageCredits > 0 && !prompt) setGeneratedCode(null); else setShowPricingModal(true); }}
              className="mt-4 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white font-semibold rounded-lg"
            >
              {pageCredits > 0 ? 'Try Again' : 'Upgrade Plan'}
            </button>
        </div>
      ) : generatedCode ? (
        <div className="w-full h-full max-w-7xl mx-auto flex flex-col">
          <CodeOutput code={generatedCode} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl">
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-sm py-1 px-4 rounded-full mb-4 cursor-default">
            Introducing Vibe Coder
          </button>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-yellow-400">
            Vibe Coder
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl">
            Code your vibe. Instantly generate websites with AI.
          </p>
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="flex h-screen w-full bg-noisy-gradient text-white font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 w-full pt-24 pb-24">
          <ErrorBoundary>
            {activePage === 'home' ? renderHomePage() : (
              <IdeaPage 
                ideaCredits={ideaCredits}
                showPricing={() => setShowPricingModal(true)}
                onIdeaGenerated={() => setIdeaCredits(prev => prev - 1)}
              />
            )}
          </ErrorBoundary>
        </main>
        <Footer />
        
        {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} onSelectPlan={handleSelectPlan} />}
      </div>
    </div>
  );
};

export default App;
