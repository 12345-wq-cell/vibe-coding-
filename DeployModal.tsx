import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, SparklesIcon } from './icons';

interface DeployModalProps {
  onClose: () => void;
}

const DEPLOYMENT_STEPS = [
  "Verifying domain ownership",
  "Provisioning infrastructure on Google Cloud",
  "Uploading website files",
  "Configuring DNS records",
  "Securing with SSL certificate",
  "Optimizing for global delivery (CDN)",
];

const DeployModal: React.FC<DeployModalProps> = ({ onClose }) => {
  const [domain, setDomain] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isDeploying && currentStep < DEPLOYMENT_STEPS.length) {
      interval = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else if (currentStep >= DEPLOYMENT_STEPS.length) {
      setIsDeploying(false);
      setIsDeployed(true);
    }
    return () => clearTimeout(interval);
  }, [isDeploying, currentStep]);

  const handleDeploy = () => {
    // Basic domain validation
    if (!domain.trim() || !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
      setError("Please enter a valid domain name (e.g., my-awesome-site.com)");
      return;
    }
    setError(null);
    setIsDeploying(true);
  };

  const renderInitialContent = () => (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Go Live!</h2>
        <p className="mt-2 text-lg text-gray-600">Enter your domain name to deploy your website to the world.</p>
      </div>
      <div className="mt-8">
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700 sr-only">Domain Name</label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="your-domain.com"
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <div className="mt-8">
        <button
          onClick={handleDeploy}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
        >
          Deploy Website
        </button>
        <p className="mt-3 text-xs text-gray-500 text-center">By deploying, you agree to our terms of service.</p>
      </div>
    </>
  );

  const renderDeployingContent = () => (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900">Deployment in Progress...</h2>
      <p className="mt-2 text-lg text-gray-600">Your website is being published to <span className="font-bold text-gray-800">{domain}</span></p>
      <div className="mt-8 space-y-4 text-left">
        {DEPLOYMENT_STEPS.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            {index < currentStep ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
            ) : index === currentStep ? (
                <SparklesIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 animate-pulse" />
            ) : (
                <div className="h-6 w-6 flex-shrink-0 border-2 border-gray-300 rounded-full" />
            )}
            <span className={`text-lg ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderDeployedContent = () => (
      <div className="text-center">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Deployment Successful!</h2>
          <p className="mt-2 text-lg text-gray-600">Congratulations! Your website is now live.</p>
          <div className="mt-6">
              <a 
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white border border-gray-300 py-2 px-6 rounded-lg text-lg text-yellow-600 font-bold hover:bg-gray-100 transition-colors"
              >
                  Visit {domain}
              </a>
          </div>
          <button
            onClick={onClose}
            className="mt-8 text-sm text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10" disabled={isDeploying}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="p-8 md:p-12">
            {!isDeploying && !isDeployed && renderInitialContent()}
            {isDeploying && renderDeployingContent()}
            {isDeployed && renderDeployedContent()}
        </div>
      </div>
    </div>
  );
};

export default DeployModal;