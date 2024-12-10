import React, { useState } from "react";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";

const ApplicantSubmission = ({ applicant }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Sorting and filtering logic
  const sortedAndFilteredApplicants = React.useMemo(() => {
    let result = [...applicant];

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
  }, [applicant, searchTerm, sortConfig]);

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
    { key: "jobcode", label: "Job Code" },
    { key: "jobapplied", label: "Job Applied" },
    { key: "joblocation", label: "Job Location" },
    { key: "clientjobid", label: "Client Job ID" },
    { key: "clientname", label: "Client Name" },
    { key: "clientmanager", label: "Client Manager" },
    { key: "recruitmentmanager", label: "Recruitment Manager" },
    { key: "salesmanager", label: "Sales Manager" },
    { key: "primaryrecruiter", label: "Primary Recruiter" },
    { key: "applicantid", label: "Application ID" },
    { key: "applicantname", label: "Application Name" },
  ];

  return (
    <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
      {/* Search and Filter Section */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search applicants..."
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
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {headers.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition duration-200 group"
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
            {sortedAndFilteredApplicants.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition-colors duration-200 border-b last:border-b-0"
              >
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
      {sortedAndFilteredApplicants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No applicants found
        </div>
      )}
    </div>
  );
};

export default ApplicantSubmission;
