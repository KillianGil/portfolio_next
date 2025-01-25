'use client'; 

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './Apollo';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}