"use client";

import { useState } from 'react';
import ProfileForm from '@/components/profile/ProfileForm';
import SecuritySettings from '@/components/profile/SecuritySettings';
import SubscriptionInfo from '@/components/profile/SubscriptionInfo';
import ApiKeys from '@/components/profile/ApiKeys';
import { useUser } from '@/hooks/useUser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function ProfilePage() {
  const { user } = useUser();
  
  if (!user) {
    return <div className="container mx-auto p-4">Loading user data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm user={user} />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="subscription">
          <SubscriptionInfo />
        </TabsContent>
        <TabsContent value="api">
          <ApiKeys />
        </TabsContent>
      </Tabs>
    </div>
  );
}
