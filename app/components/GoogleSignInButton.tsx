"use client";

import { useEffect } from "react";

interface GoogleSignInButtonProps {
  clientId: string;
  onSuccess: (response: any) => void;
  onError?: () => void;
}

export default function GoogleSignInButton({ clientId, onSuccess, onError }: GoogleSignInButtonProps) {
  useEffect(() => {
    // Load Google SDK
    if (!document.querySelector('script[src*="google"]')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Initialize Google Sign-In
    setTimeout(() => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: onSuccess,
        });

        const container = document.getElementById('custom-google-signin-button');
        if (container && !container.querySelector('[data-rendered="true"]')) {
          try {
            window.google.accounts.id.renderButton(container, {
              theme: 'dark',
              size: 'large',
              width: '100%',
              locale: 'en',
            });
            container.setAttribute('data-rendered', 'true');
          } catch (err) {
            console.log('Google button render attempted');
          }
        }
      }
    }, 100);
  }, [clientId, onSuccess]);

  return (
    <div
      id="custom-google-signin-button"
      className="w-full rounded-xl overflow-hidden [&>div]:!w-full [&>div>div]:rounded-xl"
    ></div>
  );
}

declare global {
  interface Window {
    google?: any;
  }
}
