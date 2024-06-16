
import { UserType } from '../redux/query/apiSlice';
import { useEffect, useState } from 'react';
// import { DeleteFilled } from '@ant-design/icons';
import api from '../uitility/api';

function UserAdminData() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await api.get('/user');
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const filteredUserData = userData.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={isDarkMode ? 'dark' : '    '}>
      <div className=" bg-gray-100 dark:bg-gray-900  transition-colors duration-500">
        <div className="container mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-serif">User Admin Dashboard</h1>
            
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700    bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUserData.length > 0 ? (
              filteredUserData.map((item) => (
                <div
                  key={item._id}
                  className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md transition-colors duration-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 dark:hover:font-semibold cursor-pointer  dark:bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-700 dark:text-gray-300">
                      {item.firstName.charAt(0)}{item.lastName.charAt(0)}
                    </div>
                    <h2 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">{item.firstName} {item.lastName}</h2>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300 mb-2"><strong>ID:</strong> {item._id}</p>
                  <p className="text-gray-800 dark:text-gray-300 mb-2"><strong>Email:</strong> {item.email}</p>
                  {/* <button className='  text-white'><DeleteFilled/></button> */}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-300">No data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdminData;
