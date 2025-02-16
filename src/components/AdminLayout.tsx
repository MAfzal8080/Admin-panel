import { Outlet, useNavigate } from 'react-router-dom';
import { Settings, Users, LogOut, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';
import { useEffect, useState } from 'react';

export function AdminLayout() {
    const {logout} = useAuthStore(); 
    const [userData, setUserData] = useState({email:'', pic:''}) 
    const navigate = useNavigate()

    useEffect(() => {

        if(!localStorage.getItem('user')){
            navigate('/login');
        }
        const userinfo = JSON.parse(localStorage.getItem('user'));
        const username = userinfo?.email;
        const picu = userinfo?.picture;
        setUserData({email: username, pic: picu});
    }, [])
    


  const navigation = [
    { name: 'Bot Settings', href: '/admin/settings', icon: Settings },
    { name: 'User Management', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">

        <div className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 border-b">
              <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={'flex px-2 py-2 rounded bg-gray-100 text-gray-900 hover:bg-gray-50 hover:text-gray-900'}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t">
              <div className="flex items-center">
                {userData.pic ? <img
                  src={userData.pic}
                  alt={userData.email}
                  className="w-8 h-8 rounded-full"
                /> : <UserIcon />}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{(userData.email).split('@')[0]}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center w-full px-2 py-2 mt-4 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}