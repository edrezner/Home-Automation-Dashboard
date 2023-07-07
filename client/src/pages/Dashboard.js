import React from "react";
import HomeList from '../components/HomeList';
import RoomList from '../components/RoomList';

const Dashboard = () => {
  return (
    <div className="container">
      <HomeList />
      <RoomList />
    </div>
  );
};

export default Dashboard;
