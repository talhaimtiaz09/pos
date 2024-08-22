import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const InventoryLocations = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ location_name: "" });
  const [editLocation, setEditLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetchData("/inventory/location", "GET");
        setLocations(response.data);
      } catch (err) {
        setError("Failed to fetch locations.");
      }
    };
    getLocations();
  }, []);

  const handleCreateLocation = async () => {
    try {
      const response = await fetchData(
        "/inventory/location",
        "POST",
        newLocation
      );
      setLocations([...locations, response.data]);
      setNewLocation({ location_name: "" });
    } catch (err) {
      setError("Failed to create location.");
    }
  };

  const handleEditLocation = async (id) => {
    try {
      await fetchData(`/inventory/location/${id}`, "PUT", editLocation);
      setLocations(
        locations.map((loc) =>
          loc.id === id ? { ...loc, ...editLocation } : loc
        )
      );
      setEditLocation(null);
    } catch (err) {
      setError("Failed to update location.");
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await fetchData(`/inventory/location/${id}`, "DELETE");
      setLocations(locations.filter((loc) => loc.id !== id));
    } catch (err) {
      setError("Failed to delete location.");
    }
  };

  return (
    <div className="p-6  shadow-md rounded-lg w-full">
      <div className="p-4 my-4 bg-ice-white rounded-md">
        <h2 className="text-2xl font-bold mb-4">Inventory Location</h2>

        {/* Add New Location */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Location Name"
            value={newLocation.location_name}
            onChange={(e) =>
              setNewLocation({ ...newLocation, location_name: e.target.value })
            }
            className="flex-1 px-3 py-2 border rounded-lg border-[2px] border-slate-400"
          />
          <button
            onClick={handleCreateLocation}
            className="px-4 py-2 bg-primary text-txt-white rounded-lg flex items-center gap-2 hover:bg-primary-hover"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Location
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Location List */}
      {locations.length > 0 ? (
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-slate-300">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td className="p-2 border">{location.id}</td>
                <td className="p-2 border">
                  {editLocation?.id === location.id ? (
                    <input
                      type="text"
                      value={editLocation.location_name}
                      onChange={(e) =>
                        setEditLocation({
                          ...editLocation,
                          location_name: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    location.location_name || "N/A"
                  )}
                </td>
                <td className="p-2 border">
                  {editLocation?.id === location.id ? (
                    <>
                      <button
                        onClick={() => handleEditLocation(location.id)}
                        className="px-2 py-1 bg-green-500 text-txt-white rounded-lg mr-2 hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditLocation(null)}
                        className="px-2 py-1 bg-gray-500 text-txt-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditLocation(location)}
                        className="px-2 py-1 bg-yellow-500 text-txt-white rounded-lg mr-2 hover:bg-yellow-600"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(location.id)}
                        className="px-2 py-1 bg-red-500 text-txt-white rounded-lg hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No locations found.</p>
      )}
    </div>
  );
};

export default InventoryLocations;
