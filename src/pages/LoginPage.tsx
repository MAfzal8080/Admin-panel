import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';
import { useEffect } from 'react';

export function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate()

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem('user'));
    if(userinfo?.token){
      navigate('/admin');
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in with your Google account to access the admin panel
          </p>
        </div>
        {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_API_KEY}>
          <GoogleLoginButton />
        </GoogleOAuthProvider> */}
        <button
          onClick={() => login()}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}