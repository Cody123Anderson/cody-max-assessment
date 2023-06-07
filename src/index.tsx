import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import axios from 'axios';

import './index.css';
import reportWebVitals from './reportWebVitals';
import {Routes} from "./Routes";
import { StateProvider } from './api/store';

// Configure axios defaults
axios.defaults.baseURL = 'https://music.musicaudience.info/api/v1/music';
axios.defaults.headers.common['Authorization'] = `apiKey 5db48e1f3a0a4580bad47849f1317bd0`;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
      </StateProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
