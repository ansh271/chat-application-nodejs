const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-lg font-medium">Demo User</p>
        <p className="text-gray-500">demo@example.com</p>

        <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
