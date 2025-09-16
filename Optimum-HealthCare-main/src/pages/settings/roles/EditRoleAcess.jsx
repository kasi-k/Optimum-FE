import React, { useState } from "react";
import NavBar from "../../../component/NavBar";
import { useNavigate } from "react-router-dom";

const EditRoleAccess = () => {
  const [roleName, setRoleName] = useState("");
  const [selectedSettings, setSelectedSettings] = useState({});
  const [permissions, setPermissions] = useState({});
  const navigate = useNavigate();

  const settingsOptions = [
    "Dashboard",
    "Enquiry Management",
    "Shipment Management",
    "Customer Management",
    "Communications",
    "Report & Analytics",
    "Invoice & Payments",
    "Terms Of Service",
    "Privacy Policy",
    "Subscription",
    "Settings",
  ];

  const permissionOptions = [
    "All",
    "View",
    "Create",
    "Edit",
    "Delete",
    "Download",
  ];

  // Toggle Settings Checkbox
  const toggleSetting = (setting) => {
    setSelectedSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));

    setPermissions((prev) => {
      if (prev[setting]) {
        const updated = { ...prev };
        delete updated[setting];
        return updated;
      }
      return { ...prev, [setting]: [] };
    });
  };

  // Handle Permission Changes
  const handlePermissionChange = (setting, permission, checked) => {
    setPermissions((prev) => {
      let updatedPermissions = prev[setting] || [];

      if (permission === "All") {
        // If "All" is checked, select all permissions
        updatedPermissions = checked ? permissionOptions.slice(1) : [];
      } else {
        // Add or remove individual permission
        updatedPermissions = checked
          ? [...updatedPermissions, permission]
          : updatedPermissions.filter((p) => p !== permission);

        // If "All" was checked and one is unchecked, uncheck "All"
        if (!checked) {
          updatedPermissions = updatedPermissions.filter((p) => p !== "All");
        }
      }

      // If all individual permissions are checked, check "All" again
      if (updatedPermissions.length === permissionOptions.length - 1) {
        updatedPermissions = ["All", ...updatedPermissions];
      }

      return { ...prev, [setting]: updatedPermissions };
    });
  };

  const handleSave = () => {
    navigate("../");
  };

  return (
    <>
      <NavBar title="Settings" pagetitle="Role Access" />
      <div className="flex justify-between items-center p-3 rounded-md mb-2">
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold dark:text-white">Role name:</span>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="dark:bg-layout-dark bg-layout-light text-select_layout-dark text-base px-3 py-1.5 rounded-md outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/setting")}
            className="cursor-pointer border border-select_layout-dark text-select_layout-dark px-8 py-2 rounded-sm"
          >
            Cancel
          </button>
          <p onClick={handleSave} className="bg-select_layout-dark text-white px-8 py-2 rounded-sm">
            Save
          </p>
        </div>
      </div>
      <div className="dark:bg-layout-dark bg-layout-light dark:text-white p-6 mx-3 rounded-lg shadow-lg ">
        <div className="grid grid-cols-3 ">
          {/* Settings Column */}
          <div className="border-r-2  dark:border-gray-100 p-3">
            <h2 className="text-lg font-medium mb-4 w-1/2 text-center">
              Settings
            </h2>
            {settingsOptions.map((setting) => (
              <div key={setting} className="flex items-center gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!selectedSettings[setting]}
                      onChange={() => toggleSetting(setting)}
                      className="appearance-none w-5 h-5 border-2 dark:border-gray-100 rounded-md checked:bg-select_layout-dark checked:border-transparent focus:outline-none transition-all duration-200"
                    />
                    {/* Custom Checkmark */}
                    <span className="absolute w-5 h-5 flex justify-center items-center pointer-events-none">
                      {selectedSettings[setting] && (
                        <svg
                          className="w-10 h-4 text-black"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </span>
                  </label>

                  {setting}
                </label>
              </div>
            ))}
          </div>

          {/* Permissions Column */}
          <div className="p-4">
            <h2 className="text-lg font-medium mb-2">Permissions</h2>
            {settingsOptions.map((setting) => (
              <div key={setting} className=" flex items-center">
                {selectedSettings[setting] ? (
                  <div className="flex items-center justify-between p-2 rounded-md">
                    <div className="flex gap-4 w-3/4">
                      {permissionOptions.map((perm) => (
                        <label
                          key={perm}
                          className="flex items-center gap-4 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={
                              permissions[setting]?.includes(perm) || false
                            }
                            onChange={(e) =>
                              handlePermissionChange(
                                setting,
                                perm,
                                e.target.checked
                              )
                            }
                            className="appearance-none w-5 h-5 border-2 dark:border-gray-100 rounded-md checked:bg-select_layout-dark checked:border-transparent focus:outline-none transition-all duration-200"
                          />
                          {/* Custom Checkmark */}
                          <span className="absolute w-5 h-5 flex justify-center items-center pointer-events-none">
                            {permissions[setting]?.includes(perm) && (
                              <svg
                                className="w-10 h-4 text-black"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            )}
                          </span>
                          {perm}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-9"></div> // Keeps spacing even when unchecked
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRoleAccess;
