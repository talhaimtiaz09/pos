import React, { useState, useEffect } from "react";

const BatchDetailsForm = ({
  batchId,
  batchDetails,
  handleCreateBatchDetail,
  handleUpdateBatchDetail,
  handleDeleteBatchDetail,
}) => {
  const [newDetail, setNewDetail] = useState({ detail: "", batch_id: batchId });
  const [editingDetail, setEditingDetail] = useState(null);

  useEffect(() => {
    if (editingDetail) {
      setNewDetail(editingDetail);
    }
  }, [editingDetail]);

  const handleAddDetail = () => {
    handleCreateBatchDetail(newDetail);
    setNewDetail({ detail: "", batch_id: batchId });
  };

  const handleEditDetail = () => {
    handleUpdateBatchDetail(newDetail);
    setEditingDetail(null);
    setNewDetail({ detail: "", batch_id: batchId });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Detail"
        className="border p-2 rounded-md w-full"
        value={newDetail.detail}
        onChange={(e) => setNewDetail({ ...newDetail, detail: e.target.value })}
      />
      <button
        className="bg-primary text-txt-white px-4 py-2 rounded-md"
        onClick={editingDetail ? handleEditDetail : handleAddDetail}
      >
        {editingDetail ? "Update Detail" : "Add Detail"}
      </button>
      {editingDetail && (
        <button
          className="bg-gray-500 text-txt-white px-4 py-2 rounded-md"
          onClick={() => setEditingDetail(null)}
        >
          Cancel
        </button>
      )}
      <table className="table-auto w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border p-2">Detail</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {batchDetails
            .filter((detail) => detail.batch_id === batchId)
            .map((detail) => (
              <tr key={detail.id}>
                <td className="border p-2">{detail.detail}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-txt-white px-3 py-1 rounded-md"
                    onClick={() => setEditingDetail(detail)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="bg-red-500 text-txt-white px-3 py-1 rounded-md"
                    onClick={() => handleDeleteBatchDetail(detail.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchDetailsForm;
