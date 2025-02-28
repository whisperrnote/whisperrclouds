import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { SubscriptionType } from '@/types';
import { updateUserSubscription } from '@/services';

export default function SubscriptionInfo() {
  const { user } = useUser();
  const [isChanging, setIsChanging] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionType | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!user) {
    return <div>Loading subscription information...</div>;
  }

  const handlePlanChange = async () => {
    if (!selectedPlan || selectedPlan === user.subscription) return;
    
    setIsChanging(true);
    setMessage(null);
    
    try {
      await updateUserSubscription(user.id, selectedPlan);
      
      setMessage({
        type: 'success',
        text: `Successfully updated to ${selectedPlan} plan`
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update subscription plan'
      });
    } finally {
      setIsChanging(false);
      setSelectedPlan(null);
    }
  };

  const plans = [
    {
      type: SubscriptionType.FREE,
      name: 'Free',
      price: '0',
      storage: '5GB',
      features: ['Basic encryption', 'Limited AI features', 'Standard support']
    },
    {
      type: SubscriptionType.PRO,
      name: 'Pro',
      price: '9.99',
      storage: '500GB',
      features: ['Advanced encryption', 'Full AI integration', 'Priority support', 'API access']
    },
    {
      type: SubscriptionType.ORGANIZATION,
      name: 'Organization',
      price: '29.99/user',
      storage: '2TB',
      features: ['Enterprise-grade security', 'Admin dashboard', 'User management', 'Custom integrations']
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Subscription Plan</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Current Plan</h3>
        <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{user.subscription} Plan</p>
              <p className="text-sm text-gray-600">
                {user.subscription === SubscriptionType.FREE ? 'Free forever' : 
                 user.subscription === SubscriptionType.PRO ? '$9.99/month' :
                 'Contact sales for pricing'}
              </p>
            </div>
            {user.subscription !== SubscriptionType.ORGANIZATION && (
              <button 
                onClick={() => setIsChanging(true)}
                className="btn-outline"
              >
                Change Plan
              </button>
            )}
          </div>
        </div>
      </div>
      
      {isChanging && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Select a New Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div 
                key={plan.type} 
                className={`border p-4 rounded-lg cursor-pointer ${
                  selectedPlan === plan.type ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                } ${user.subscription === plan.type ? 'opacity-50' : ''}`}
                onClick={() => user.subscription !== plan.type && setSelectedPlan(plan.type)}
              >
                <h4 className="font-bold">{plan.name}</h4>
                <p className="text-lg font-bold">${plan.price}<span className="text-sm font-normal">/month</span></p>
                <p className="text-sm mb-2">{plan.storage} Storage</p>
                <ul className="text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-1">
                      <span className="mr-2 text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            <button 
              onClick={() => setIsChanging(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={handlePlanChange}
              className="btn-primary"
              disabled={!selectedPlan || selectedPlan === user.subscription}
            >
              {isChanging ? 'Updating...' : 'Update Plan'}
            </button>
          </div>
        </div>
      )}
      
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-2">Billing History</h3>
        {user.subscription === SubscriptionType.FREE ? (
          <p className="text-gray-500">No billing history available on the free plan.</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Apr 1, 2023</td>
                <td className="py-2">$9.99</td>
                <td className="py-2 text-green-500">Paid</td>
                <td className="py-2"><a href="#" className="text-blue-500">Download</a></td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Mar 1, 2023</td>
                <td className="py-2">$9.99</td>
                <td className="py-2 text-green-500">Paid</td>
                <td className="py-2"><a href="#" className="text-blue-500">Download</a></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
