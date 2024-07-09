import React from "react";

const Home = () => {
  let styles = {
    interactiveDiv:
      "rounded-md shadow-lg m-4 p-10 bg-white hover:bg-green-400 font-bold h text-center p-16 transition  hover:-translate-y-1",
  };
  return (
    <div className="relative h-screen">
     
      <h1 className="text-white text-3xl font-bold p-10 hover:text-green-400 transition">
        SHADAB AGRO - POS
      </h1>
      <div className="grid grid-cols-2 mx-auto w-1/2 mt-32 ">
        <div className={styles.interactiveDiv}>
          <h1>Customer Management</h1>
        </div>
        <div className={styles.interactiveDiv}>
          <h1>Comapany Management</h1>
        </div>
        <div className={styles.interactiveDiv}>
          <h1>Inventory</h1>
        </div>
        <div className={styles.interactiveDiv}>
          <h1>Sales</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
