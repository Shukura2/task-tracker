import React, { useState } from "react";
import Modal from "./components/Modal";
import { RxDividerVertical } from "react-icons/rx";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reminder: false,
  });
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isCompletedTask, setIsCompletedTask] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: new Date().getTime().toString(),
      title: formData.title,
      description: formData.description,
      reminder: formData.reminder,
      dueDate: selectDate,
    };

    if (editingTask) {
      const updatedLists = lists.map((task) =>
        task.id === editingTask.id ? { ...newTask, id: editingTask.id } : task
      );
      setLists(updatedLists);
    } else {
      setLists([...lists, newTask]);
    }
    if (formData.reminder) {
      setReminder(selectDate);
    }
    setFormData({ title: "", description: "", reminder: false });
    closeModal();
  };

  const setReminder = (selectedDate) => {
    console.log("sss = ", formData.title);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      const timeDifference = selectedDate - currentDate;

      setTimeout(() => {
        alert(`Task Reminder: ${formData.title}`);
      }, timeDifference);
    } else {
      alert("invalid due date, please select future date");
      return;
    }
  };

  const handleDeleteTask = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  const openModal = (task) => {
    setEditingTask(task);
    setFormData(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
    setFormData({ title: "", description: "", dueDate: "" });
  };

  const handleReminderChange = (e) => {
    setFormData((prev) => ({ ...prev, reminder: !formData.reminder }));
  };

  return (
    <div className="max-w-screen-2xl mx-auto my-0 p-4">
      <h2 className="text-center text-lg lg:text-2xl font-bold mb-5">
        Task Tracker
      </h2>
      <div className=" mb-5 lg:flex lg:justify-center lg:items-center">
        <div className=" lg:max-w-[800px] bg-white rounded-lg p-4 w-full">
          <form onSubmit={handleSubmit}>
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
            <div className=" p-2 border border-gray-700 rounded-lg mb-3 pl-4 ">
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
              disabled={!formData.title.length || !formData.description.length}
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleReminderChange={handleReminderChange}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />

      <div>
        {lists.length > 0 && (
          <div>
            {lists.map((list) => {
              const { description, id, title } = list;
              return (
                <div
                  key={id}
                  className="mb-5 lg:flex lg:justify-center lg:items-center relative"
                >
                  <div
                    className={`${
                      isCompletedTask
                        ? "opacity-50 bg-gray-300 p-3 rounded-lg lg:max-w-[800px] w-full"
                        : "bg-gray-300 p-3 rounded-lg lg:max-w-[800px] w-full"
                    }`}
                  >
                    <div className="flex justify-between mb-4">
                      <h2 className=" text-lg font-bold w-[85%] dueDate">
                        {title}
                      </h2>
                      <div>
                        <button
                          className="mr-3"
                          onClick={() => {
                            openModal(list);
                          }}
                        >
                          <BiEdit size={20} color="#1E3A8A" />
                        </button>
                        <button onClick={() => handleDeleteTask(id)}>
                          <AiFillDelete size={20} color="#800020" />
                        </button>
                      </div>
                    </div>

                    <div>
                      {description.length > 150 ? (
                        <p className="w-[85%] mb-4">
                          {showMore
                            ? description
                            : description.substring(0, 150)}
                          <strong onClick={() => setShowMore(!showMore)}>
                            {showMore ? ` show less` : ` show more`}
                          </strong>
                        </p>
                      ) : (
                        <p className="w-[85%] mb-4">{description}</p>
                      )}
                    </div>
                    <p>
                      <strong>Due date:</strong>
                      {` ${selectDate.getDate()} / ${
                        selectDate.getMonth() + 1
                      } / ${selectDate.getFullYear()}`}
                    </p>

                    <div className="flex justify-between w-[80%] mx-auto mt-8 shadow-md bg-gray-200 px-4 py-2 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setIsCompletedTask(true)}
                        className="toggle"
                      >
                        Completed
                      </button>
                      <RxDividerVertical size={30} />
                      <button
                        type="button"
                        onClick={() => setIsCompletedTask(false)}
                        className="toggle"
                      >
                        Uncompleted
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
