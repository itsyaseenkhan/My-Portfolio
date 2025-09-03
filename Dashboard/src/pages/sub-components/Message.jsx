import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {getAllMessages,deleteMessage,clearAllMessageErrors,resetMessagesSlice,} from "../../Store/Slices/messageSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Message = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [messageId, setMessageId] = useState("");
  const [expandedId, setExpandedId] = useState(null); // to handle toggle
  const {  messages,  loading ,error, successMessage , } = useSelector((state) => state.messages);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, successMessage]);

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-semibold text-gray-800">Messages</h2>
         
        </div>

        {/* Loading & Error */}
        {loading && !messageId && (
          <p className="text-blue-600 text-center mb-4">Loading messages...</p>
        )}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {/* Table */}
        {Array.isArray(messages) && messages.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <React.Fragment key={msg._id}>
                    <tr
                      className="border-b hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => toggleExpand(msg._id)}
                    >
                      <td className="px-6 py-4">{msg.email}</td>
                      <td className="px-6 py-4 text-right">
                        {loading && messageId === msg._id ? (
                          <SpecialLoadingButton content="Deleting" width="w-28" />
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMessageDelete(msg._id);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>

                    {expandedId === msg._id && (
                      <tr className="bg-gray-50 border-b">
                        <td colSpan={2} className="px-6 py-4">
                          <div className="space-y-2 text-gray-800">
                            <p>
                              <span className="font-semibold">Sender Name:</span>{" "}
                              {msg.senderName}
                            </p>
                            <p>
                              <span className="font-semibold">Subject:</span>{" "}
                              {msg.Subject || "No Subject"}
                            </p>
                            <p>
                              <span className="font-semibold">Message:</span>{" "}
                              {msg.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-lg font-medium text-gray-600 mt-10">
              No Messages Found!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Message;
