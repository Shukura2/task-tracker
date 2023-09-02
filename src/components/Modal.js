import React from "react";
import DatePicker from "react-datepicker";

const Modal = ({
  isOpen,
  closeModal,
  formData,
  handleChange,
  handleSubmit,
  handleReminderChange,
  selectDate,
  setSelectDate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          x
        </span>
        <form onSubmit={handleSubmit} className=" mt-5">
          <div className=" p-2 border border-gray-700 rounded-lg mb-3 pl-4">
            <input
              type="text"
              placeholder="Add Title..."
              name="title"
              value={formData.title}
              onChange={handleChange}
              className=" w-full focus:outline-none"
            />
          </div>
          <div className=" p-2 border border-gray-700 rounded-lg mb-3 pl-4">
            <textarea
              type="text"
              placeholder="Add Description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              className=" w-full focus:outline-none"
            ></textarea>
          </div>

          <p>Choose due date</p>
          <div className=" p-2 border border-gray-700 rounded-lg mb-3 pl-4">
            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              className="custom-datepicker-input"
            />
          </div>

          <div className="flex gap-x-4 mb-3">
            <p>Set Reminder?</p>
            <input
              type="checkbox"
              name="reminder"
              checked={formData.reminder}
              onClick={handleReminderChange}
            />
          </div>

          <button
            type="submit"
            className=" bg-blue-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
