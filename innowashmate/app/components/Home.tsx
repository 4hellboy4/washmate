import React from 'react';
import Header from '../components/Header'; // Подставьте правильный путь до вашего компонента Header

const Home: React.FC = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Левая часть с Header */}
      <div className="w-500">
        <Header />
      </div>

      {/* Правая часть с контентом */}
      <div className="flex-1 bg-white">
        <div className="max-w-screen-xl flex justify-center items-center h-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Home Page</h1>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque, libero eget ultricies
              malesuada, ligula nisi mattis nulla, quis imperdiet elit orci at dui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
