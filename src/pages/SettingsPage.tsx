import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Save } from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    axios.get(`https://api.telegram.org/bot${import.meta.env.VITE_API_URL}/getMyDescription`)
      .then((res) => { setSettings(res.data.result.description) });
  }, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_API_URL}/setMyDescription`, { description: settings });
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bot Settings</h1>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bot API Key
          </label>
          <div className="flex items-center">
            <input type={showApiKey ? "text" : "password"}
              value={import.meta.env.VITE_API_URL}
              className="mt-1 p-2 w-full border rounded-md pr-10" />
            <button type="button" id="togglePassword"
              onClick={() => setShowApiKey(!showApiKey)}
              className="focus:outline-none -ml-8">
              <img src=
                "https://media.geeksforgeeks.org/wp-content/uploads/20240227164304/visible.png"
                alt="" className="w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bot description
          </label>
          <textarea
            value={settings}
            onChange={(e) => setSettings(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md pr-10"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
}