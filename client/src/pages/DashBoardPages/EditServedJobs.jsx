import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstancs";

const AddServedJobPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  console.log("today", id);
  const [formData, setFormData] = useState({
    user_id: "",
    client_served_id: "",
    job_title: "",
    client_bill: "",
    location: "",
    job_status: "",
    client: "",
    end_client: "",
    client_job_id: "",
    client_manager: "",
    priority: "",
    duration: "",
    no_of_positions: "",
    sales_manager: "",
    recruitment_manager: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/get_served_jobs/${id}`);
      setFormData(response.data.jobs[0]);
      console.log(formData);
    } catch (error) {
      console.error("Error fetching served jobs:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/update_served_jobs/${id}`,
        formData
      );
      //   console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/delete_served_jobs/${id}`);
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Served Job
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="form-group">
            <label
              htmlFor="job_title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Client Bill */}
          <div className="form-group">
            <label
              htmlFor="client_bill"
              className="block text-sm font-medium text-gray-700"
            >
              Client Bill
            </label>
            <input
              type="text"
              id="client_bill"
              name="client_bill"
              value={formData.client_bill}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Job Status */}
          <div className="form-group">
            <label
              htmlFor="job_status"
              className="block text-sm font-medium text-gray-700"
            >
              Job Status
            </label>
            <input
              type="text"
              id="job_status"
              name="job_status"
              value={formData.job_status}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Client */}
          <div className="form-group">
            <label
              htmlFor="client"
              className="block text-sm font-medium text-gray-700"
            >
              Client
            </label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* End Client */}
          <div className="form-group">
            <label
              htmlFor="end_client"
              className="block text-sm font-medium text-gray-700"
            >
              End Client
            </label>
            <input
              type="text"
              id="end_client"
              name="end_client"
              value={formData.end_client}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Client Job ID */}
          <div className="form-group">
            <label
              htmlFor="client_job_id"
              className="block text-sm font-medium text-gray-700"
            >
              Client Job ID
            </label>
            <input
              type="text"
              id="client_job_id"
              name="client_job_id"
              value={formData.client_job_id}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Client Manager */}
          <div className="form-group">
            <label
              htmlFor="client_manager"
              className="block text-sm font-medium text-gray-700"
            >
              Client Manager
            </label>
            <input
              type="text"
              id="client_manager"
              name="client_manager"
              value={formData.client_manager}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Priority */}
          <div className="form-group">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <input
              type="text"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Duration */}
          <div className="form-group">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Number of Positions */}
          <div className="form-group">
            <label
              htmlFor="no_of_positions"
              className="block text-sm font-medium text-gray-700"
            >
              # of Positions
            </label>
            <input
              type="number"
              id="no_of_positions"
              name="no_of_positions"
              value={formData.no_of_positions}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sales Manager */}
          <div className="form-group">
            <label
              htmlFor="sales_manager"
              className="block text-sm font-medium text-gray-700"
            >
              Sales Manager
            </label>
            <input
              type="text"
              id="sales_manager"
              name="sales_manager"
              value={formData.sales_manager}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Recruitment Manager */}
          <div className="form-group">
            <label
              htmlFor="recruitment_manager"
              className="block text-sm font-medium text-gray-700"
            >
              Recruitment Manager
            </label>
            <input
              type="text"
              id="recruitment_manager"
              name="recruitment_manager"
              value={formData.recruitment_manager}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 gap-4 flex justify-end">
          <button
            type="submit"
            className=" px-6 py-2 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            cancel
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Delete
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServedJobPage;
