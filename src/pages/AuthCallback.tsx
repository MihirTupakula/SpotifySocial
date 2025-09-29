import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyService } from '@/services/spotify';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { refreshAuthState } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          setError(`Spotify authentication failed: ${error}`);
          setStatus('error');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          return;
        }

        const success = await spotifyService.handleAuthCallback(code);
        
        if (success) {
          setStatus('success');
          // Refresh the auth state in the context
          await refreshAuthState();
          // Redirect to main app after a short delay
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setError('Failed to authenticate with Spotify');
          setStatus('error');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setStatus('error');
        console.error('Auth callback error:', err);
      }
    };

    handleCallback();
  }, [navigate]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
            <h2 className="text-xl font-semibold mb-2">Connecting to Spotify...</h2>
            <p className="text-muted-foreground">
              Please wait while we authenticate your account.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2">Successfully Connected!</h2>
            <p className="text-muted-foreground mb-4">
              Your Spotify account has been connected. Redirecting to the app...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
            <Button onClick={handleRetry} className="w-full">
              Try Again
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default AuthCallback;
