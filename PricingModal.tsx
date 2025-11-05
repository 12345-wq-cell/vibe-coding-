import React from 'react';
import { CheckIcon, BuildingOfficeIcon } from './icons';

type Plan = 'basic' | 'pro' | 'business';

interface PricingModalProps {
  onClose: () => void;
  onSelectPlan: (plan: Plan) => void;
}

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    onSelect: () => void;
    popular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, popular, onSelect }) => (
  <div className={`relative flex flex-col p-6 bg-white rounded-lg shadow-lg border-2 ${popular ? 'border-yellow-400' : 'border-gray-200'}`}>
    {popular && <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm bg-yellow-400 font-semibold rounded-full shadow">Most Popular</div>}
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2 text-4xl font-extrabold text-gray-900">${price}<span className="text-base font-medium text-gray-500">/month</span></p>
    <p className="mt-2 text-sm text-gray-500">Billed monthly. Cancel anytime.</p>
    <ul className="mt-6 space-y-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start">
          <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500 mr-2" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <button onClick={onSelect} className={`mt-auto w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 ${popular ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'}`}>
      Choose Plan
    </button>
  </div>
);

const PricingModal: React.FC<PricingModalProps> = ({ onClose, onSelectPlan }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative bg-gray-50 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">You've reached your generation limit</h2>
            <p className="mt-2 text-lg text-gray-600">Please upgrade to continue creating amazing websites.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
                title="Starter" 
                price="30" 
                features={["Up to 30 pages / month", "Standard Templates", "Email Support"]}
                onSelect={() => onSelectPlan('basic')}
            />
            <PricingCard 
                title="Creator" 
                price="50" 
                features={["Up to 50 pages / month", "Up to 20 ideas / month", "Image Uploads", "Priority Support"]} 
                popular
                onSelect={() => onSelectPlan('pro')}
            />
            <PricingCard 
                title="Business" 
                price="80" 
                features={["Up to 80 pages / month", "Up to 40 ideas / month", "Team Collaboration", "24/7 Dedicated Support"]} 
                onSelect={() => onSelectPlan('business')}
            />
          </div>

          <div className="mt-12 p-6 bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <BuildingOfficeIcon className="h-10 w-10 text-gray-800" />
              <div>
                <h4 className="text-xl font-bold text-gray-900">Enterprise Level</h4>
                <p className="text-gray-600">Need custom solutions? We've got you covered.</p>
              </div>
            </div>
            <a 
              href="mailto:bahnimanbharadwaj00@gmail.com"
              className="mt-4 md:mt-0 flex-shrink-0 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
