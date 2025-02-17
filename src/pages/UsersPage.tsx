import axios from 'axios';
import { Ban, Trash2, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { telegram } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function UsersPage() {
  const [user, setUser] = useState<telegram[]>([]);
  const [token, setToken] = useState('');
  const [showLogs, setShowLogs] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem('user'));
    if (!userinfo.token) {
      navigate('/login');
    }
    setToken(userinfo.token);
    axios.get('http://localhost:3000/bot/telegramUser', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((data) => {
      setUser(data.data.users);
    })
  }, [])

  const stopUser = async (id: number) => {
    const stop = await axios.get(`http://localhost:3000/bot/block/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (stop?.data) {
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user.chatId === id ? { ...user, isBlock: !user.isBlock } : user
        ));
        toast.success('User blocked successfully');
    }
  }

  const deleteUser = async (id: number) => {
    const deleted = await axios.delete(`http://localhost:3000/bot/${id}/delete`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (deleted) {
      setUser(user.filter(item => item.chatId != id));
      toast.success('User deleted successfully');
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
  <h1 className="text-2xl font-bold text-gray-900 mb-8">User Management</h1>

  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Username
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Subscribed
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {user.map((user: telegram) => (
          <tr key={user.chatId}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{user.username}</div>
              <details className="mt-2">
                <summary className="text-blue-500 hover:text-blue-700 cursor-pointer">Show Logs</summary>
                {user.conversations.map((log: string, index: number) => (
                  <p key={index} className="text-sm text-gray-700">{log.message}</p>
                ))}
              </details>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{user.isSubscribe === true ? "Yes" : "No"}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => stopUser(user.chatId)}
                className={
                  `inline-flex items-center px-3 py-1 rounded-md text-sm font-medium mr-2
                  ${user.isBlock
                    ? "text-green-700 bg-green-50 hover:bg-green-100"
                    : "text-red-700 bg-red-50 hover:bg-red-100"}`
                }
              >
                {user.isBlock ? (
                  <><UserCheck className="w-4 h-4 mr-1" /> Unblock</>
                ) : (
                  <><Ban className="w-4 h-4 mr-1" /> Block</>
                )}
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this user?')) {
                    deleteUser(user.chatId);
                  }
                }}
                className="inline-flex items-center px-3 py-1 text-red-700 bg-red-50 rounded-md text-sm font-medium hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}