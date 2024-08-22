import React from "react";

const Dashboard = () => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <div class="p-8 bg-white text-gray-800 rounded shadow-md border border-gray-300">
        <p>White - #FFFFFF</p>
      </div>
      <div class="p-8 bg-[#F8F8FF] text-gray-800 rounded shadow-md">
        <p>Ghost White - #F8F8FF</p>
      </div>
      <div class="p-8 bg-[#FFFAFA] text-gray-800 rounded shadow-md">
        <p>Snow White - #FFFAFA</p>
      </div>
      <div class="p-8 bg-[#F0F8FF] text-gray-800 rounded shadow-md">
        <p>Ice White - #F0F8FF</p>
      </div>
      <div class="p-8 bg-[#F5FFFA] text-gray-800 rounded shadow-md">
        <p>Mint Cream - #F5FFFA</p>
      </div>
      <div class="p-8 bg-[#F0FFFF] text-gray-800 rounded shadow-md">
        <p>Azure White - #F0FFFF</p>
      </div>
      <div class="p-8 bg-[#F5F5F5] text-gray-800 rounded shadow-md">
        <p>Seashell White - #F5F5F5</p>
      </div>
      <div class="p-8 bg-[#E0FFFF] text-gray-800 rounded shadow-md">
        <p>Light Cyan - #E0FFFF</p>
      </div>
    </div>
  );
};

export default Dashboard;
