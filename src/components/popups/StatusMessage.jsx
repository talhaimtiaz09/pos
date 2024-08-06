import React, { useEffect } from "react";

const StatusMessage = ({ response, status }) => {
  useEffect(() => {
    // This effect will run whenever the response or status changes
    if (response || status) {
      console.log("Response or status updated:", { response, status });
    }
  }, [response, status]);

  return (
    <div className="bg-white shadow-md p-4 rounded-md my-10">
      {response ? (
        <div>
          <p className="text-green-500">{status}</p>
          {Object.keys(response.data).map((key) => (
            <div className="flex gap-x-2">
              <p className="font-bold"> {key} : </p>
              <p key={key}>{response.data[key]}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-red-500 font-bold">{status}</p>
        </div>
      )}
    </div>
  );
};

export default StatusMessage;
