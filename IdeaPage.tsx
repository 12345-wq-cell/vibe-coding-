import React, { useState } from 'react';
import type { WebsiteIdea } from '../types';
import { generateWebsiteIdeas } from '../services/geminiService';
import { LightbulbIcon, SparklesIcon } from './icons';

interface IdeaPageProps {
    ideaCredits: number;
    showPricing: () => void;
    onIdeaGenerated: () => void;
}

const IdeaPage: React.FC<IdeaPageProps> = ({ ideaCredits, showPricing, onIdeaGenerated }) => {
  const [topic, setTopic] = useState<string>('');
  const [ideas, setIdeas] = useState<WebsiteIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdeas = async () => {
    if (ideaCredits <= 0) {
        setError('You have run out of idea generation credits. Please upgrade your plan.');
        showPricing();
        return;
    }

    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIdeas([]);

    try {
      const result = await generateWebsiteIdeas(topic);
      setIdeas(result);
      onIdeaGenerated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!isLoading && topic.trim()) {
        handleGenerateIdeas();
      }
    }
  };

  return (
    <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center w-full">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
            <LightbulbIcon className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
          <h1 className="text-4xl font-bold text-white">Spark Your Next Creation</h1>
          <p className="mt-2 text-lg text-gray-300">
            Feeling stuck? Enter a topic and let our AI generate innovative website ideas for you.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8 bg-white/5 p-2 border border-white/10 rounded-lg shadow-sm">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Sustainable fashion, local coffee shops, retro gaming..."
            className="w-full p-3 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerateIdeas}
            disabled={isLoading || !topic.trim()}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 text-black font-bold py-3 px-6 rounded-md transition-colors duration-200"
          >
            {isLoading ? 'Generating...' : 'Generate Ideas'}
          </button>
        </div>

        {isLoading && (
            <div className="text-center p-8">
                <SparklesIcon className="h-12 w-12 text-yellow-400 animate-pulse mx-auto" />
                <p className="mt-4 text-gray-300">Thinking of brilliant ideas...</p>
            </div>
        )}
        
        {error && (
            <div className="text-center p-8 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
                <p>{error}</p>
            </div>
        )}

        {ideas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-white/20 transition-all duration-200">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{idea.title}</h3>
                <p className="text-gray-300">{idea.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default IdeaPage;
