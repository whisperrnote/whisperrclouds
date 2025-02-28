"use client";

import { useState, useEffect } from 'react';
import { MarketplaceApp } from '@/types';
import { Card } from '@/components/ui';

export default function IntegrationsPage() {
  const [apps, setApps] = useState<MarketplaceApp[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['AI & ML', 'Productivity', 'Security', 'Communication', 'Analytics'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Integration Marketplace</h1>

      <div className="flex gap-4 mb-8">
        <input
          type="search"
          placeholder="Search integrations..."
          className="flex-1 p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apps.map(app => (
          <Card key={app.id} className="p-4">
            <div className="flex items-center mb-4">
              <img src={app.icon} alt={app.name} className="w-12 h-12 rounded" />
              <div className="ml-4">
                <h3 className="font-bold">{app.name}</h3>
                <p className="text-sm text-gray-600">{app.publisher}</p>
              </div>
            </div>
            <p className="mb-4">{app.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm">
                {app.pricing.type === 'free' ? 'Free' : `From ${app.pricing.price}/mo`}
              </span>
              <button className="btn-primary">Install</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
