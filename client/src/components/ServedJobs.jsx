import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstancs";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServedJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch jobs data
  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/get_served_jobs");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching served jobs:", error);
      setError("Failed to fetch served jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleSelect(job_id) {
    navigate(`/served-jobs/edit/${job_id}`);
  }

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Sorting and filtering logic
  const sortedAndFilteredJobs = React.useMemo(() => {
    let result = [...jobs];

    // Filtering
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [jobs, searchTerm, sortConfig]);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const headers = [
    { key: "job_title", label: "Job Title" },
    { key: "client_bill", label: "Client Bill" },
    { key: "location", label: "Location" },
    { key: "job_status", label: "Job Status" },
    { key: "client", label: "Client" },
    { key: "end_client", label: "End Client" },
    { key: "client_job_id", label: "Client Job ID" },
    { key: "client_manager", label: "Client Manager" },
    { key: "priority", label: "Priority" },
    { key: "duration", label: "Duration" },
    { key: "no_of_positions", label: "# of Positions" },
    { key: "sales_manager", label: "Sales Manager" },
    { key: "recruitment_manager", label: "Recruitment Manager" },
  ];

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">{error}</span>
        <button
          onClick={getData}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
      {/* Search and Filter Section */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search served jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          <Filter className="mr-2" size={18} />
          Filters
        </button>
        <button
          onClick={() => navigate("servedjobs/addjob")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ml-4"
        >
          Add job
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-6 text-xs text-nowrap font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>

              {headers.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-6  text-xs text-nowrap font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition duration-200 group"
                >
                  <div className="flex items-center">
                    {label}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {sortConfig.key === key &&
                        (sortConfig.direction === "ascending" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedAndFilteredJobs.map((item) => (
              <tr
                key={item.client_served_id}
                className="hover:bg-blue-50 transition-colors duration-200 border-b last:border-b-0"
              >
                <div className="px-7 flex items-center justify-center py-3 text-sm text-gray-700 whitespace-nowrap">
                  <input
                    className="mr-12"
                    type="checkbox"
                    name=""
                    id=""
                    onClick={() => handleSelect(item.client_served_id)}
                  />
                </div>
                {headers.map(({ key }) => (
                  <td
                    key={key}
                    className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results Handling */}
      {sortedAndFilteredJobs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No served jobs found
        </div>
      )}
    </div>
  );
};

export default ServedJobs;
