"use client";
import React, { useEffect, useState } from "react";
import {testurl} from "@/constant.js";
import useStore from '@/store';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Checkbox,
  DialogActions,
  Tooltip,
  InputAdornment,
  Avatar,
  Typography,
  IconButton,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
    TextField,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DateComponent from "@/app/components/Date";
import { toast } from "react-toastify";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  getGridStringOperators,
} from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateAppointments from "@/app/components/CreateAppointments";
import UpdateAppointments from "@/app/components/UpdateAppointments";
import SideBar from "@/app/components/SideBar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { DataArrayTwoTone } from "@mui/icons-material";

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-root": {
            borderRadius: "30px",
          },
          borderRadius: "4px",
        },
        icon: {
          // Style the dropdown icon if necessary
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // Style your MenuItem here
          "&.Mui-selected": {
            // backgroundColor: '#4caf50', // This is for selected item
            // color: 'white',
            "&:hover": {
              backgroundColor: "#66bb6a", // Lighten the color on hover
            },
          },
          // '&:hover': {
          //   backgroundColor: '#eeeeee', // Lighten the color on hover for other items
          // },
        },
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #F5F5F5",
  boxShadow: 24,
  p: 4,
};

const createAppointmentsStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "100%",
  overflow: "cursor",
  bgcolor: "white",
  border: "2px solid #F5F5F5",
  boxShadow: 24,
  p: 4,
};

const Appointments = () => {

    const { userRole, data, isLoading, fetchData } = useStore(); // store
    const filterOperators = getGridStringOperators().filter(({ value }) =>
        ["contains" /* add more over time */].includes(value)
    );

    const [openUpdateAppointments, setOpenUpdateAppointments] =
        useState(false);
    const [userRoleZ, setUserRoleZ] = useState("");
    const [selectedAppointments, setSelectedAppointments] = useState(null);
    const [appointmentsListUpdate, setAppointmentsListUpdate] = useState([]);
    const [rowCountsPerDate, setRowCountsPerDate] = useState({});
    const [loading, setLoading] = useState(true);
    const [originalAppointmentsRowsData, setOriginalAppointmentsRowsData] = useState("");
    const [userFilterName, setUserFilterName] = useState("");
    const [selectionModel, setSelectionModel] = useState([]);
    const [renderFlag, setRenderFlag] = useState(false);
    const [selectedRows, setSelectedRows] = useState([null]);
    const [columns, setColumns] = useState();
    const [appointmentsRowsData, setAppointmentsRowsData] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [open, setOpen] = React.useState(false);
    const [currentNote, setCurrentNote] = React.useState("");
    const [selectedRowId, setSelectedRowId] = React.useState(null);
    const [openViewNote, setOpenViewNote] = React.useState(false);
    const [selectedRowNote, setSelectedRowNote] = React.useState("");
    const [openCreateAppointments, setOpenCreateAppointments] =
        React.useState(false);
    const [deleteFlag, setDeleteFlag] = useState(true);
    const [filterModel, setFilterModel] = React.useState({
        items: [],
    });
    const [tutors, setTutors] = useState([])
    const [clients, setClients] = useState([])
    const [statusData, setStatusData] = useState([
        {
            value: "A",
            code: "A",
            label: "Active",
            status: "Active",
            color: "#6ccca5 ",
            fontColor: "#00351f",
        },
        {
            value: "E",
            code: "E",
            label: "Ended",
            status: "Ended",
            color: "#ffffc9",
            fontColor: "#919127",
        },
        {
            value: "c",
            code: "c",
            label: "Cancelled",
            status: "Cancelled",
            color: "#ffc9c9",
            fontColor: "#db1a1a",
        },
    ]);

    // get users for mapping data in appointments and employee dropdown
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [tutorsRes, clientsRes] = await Promise.all([
    //                 axios.get(`${testurl}/employees`),
    //                 axios.get(`${testurl}/clients`)
    //               ]);
            
    //               setTutors(tutorsRes.data.data);
    //               setClients(clientsRes.data.data);

    //         } catch (error) {
    //             toast.error("Failed to fetch Tutors and clients. Retry later.")
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // both use states fetching data from Zustand
    useEffect(() => {
        if (!isLoading) {
            setUserRoleZ(userRole)
            setTutors(data.employeesData.data);
            setClients(data.clientsData.data);
        }
    }, [isLoading]);

    useEffect(() => {
        const userRole12 = localStorage.getItem('userRole');
        console.log(userRole12); // Output: "admin"
        fetchData()
    }, []);


    useEffect(() => {
        const columnsData = [
            {
                field: "date",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Date",
                width: 0,
                sortable: false,
                disableColumnMenu: true,
                hideable: true,
            },
            {
                field: "time",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Time",
                width: 130,
                renderCell: (params) => {
                    if (params.row.isGroup) {
                        return (
                            <strong
                                style={{
                                    paddingLeft: "10px",
                                }}
                            >{`${params.row.date} (${rowCountsPerDate[params.row.date]
                                })`}</strong>
                        );
                    } else {
                        return (
                            <Tooltip title={params.row.date}>
                                <span>{params.value}</span>
                            </Tooltip>
                        );
                    }

                    // Custom rendering for group header cells
                    // if (params.row && params.row.hasOwnProperty("time")) {
                    //   // Render the time information
                    //   return (
                    //     <strong
                    //       style={{
                    //         paddingLeft: "10px",
                    //       }}
                    //     >{`${params.row.time}`}</strong>
                    //   );
                    // } else if(params.row.isGroup) {
                    //   debugger
                    //   // If the row object does not contain a "time" property, render the default content
                    //   return (
                    //     <Tooltip title={params.row.date}>
                    //       <span>
                    //         {`${params.row.date}(${rowCountsPerDate[params.row.date]})`}
                    //       </span>
                    //     </Tooltip>
                    //   );
                    // }
                },
            },
            // {
            //     field: "title",
            //     sortable: false,
            //     disableColumnMenu: true,
            //     headerName: "Title",
            //     width: 100,
            //     renderCell: (params) => (
            //         <Tooltip title={params.value}>
            //             <span>{params.value}</span>
            //         </Tooltip>
            //     ),
            // },
            {
                field: "service",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Service",
                width: 130,
                renderCell: (params) => (
                    <Tooltip title={params.value}>
                        <span>{params.value}</span>
                    </Tooltip>
                ),
            },
            // {
            //     field: "subservice",
            //     sortable: false,
            //     disableColumnMenu: true,
            //     headerName: "Sub Service",
            //     width: 100,
            //     renderCell: (params) => (
            //         <Tooltip title={params.value}>
            //             <span>{params.value}</span>
            //         </Tooltip>
            //     ),
            // },
             {
                field: "duration",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Duration",
                width: 130,
                renderCell: (params) => (
                    <Tooltip title={params.value}>
                        <span>{params.value}</span>
                    </Tooltip>
                ),
            },
            {
                field: "tutorName",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Tutor",
                width: 130,
            },
            // {
            //     field: "clientName",
            //     sortable: false,
            //     disableColumnMenu: true,
            //     headerName: "Client",
            //     width: 150,
            // },
            {
                field: "clients",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Client",
                width: 130,
            },
            {
                field: "status",
                sortable: false,
                disableColumnMenu: true,
                headerName: "Status",
                width: 130,
                // editable: true,
                // valueSetter: setStatus,
                // valueGetter: getStatus,
                // onChange:changeStatus,
                // filterOperators

        // type: "singleSelect",
        // valueOptions: [
        //   { value: "Active", label: "Active" },
        //   { value: "Suspended", label: "Suspended" },
        //   { value: "Pending", label: "Pending" },
        // ],
        // valueParser: (value) => {
        //   debugger
        //   if (typeof value === 'string') {
        //     return statusData.find((s) => s.value === value);
        //   }

        //   return value;
        // },
        // valueFormatter: ({ value }) => value?.label,
        // groupingValueGetter: (params) => params.value.code,
        // sortComparator: (v1, v2, param1, param2) =>
        // gridStringOrNumberComparator(v1.label, v2.label, param1, param2),
        // editable:false,

        renderCell: (params) => {
          if (params.row.isGroup) {
            return;
          }
          let bColor;
          let fColor;
          statusData.map((f) => {
            if (f.status === params.row.status) {
              bColor = f.color;
              fColor = f.fontColor;
            }
          });

          return (
            <ThemeProvider theme={theme}>
              <Select
                sx={{
                  ".MuiInputBase-input": {
                    margin: "-7px 0px",
                    // width: '5em',
                    // textAlign: 'center'
                  },
                  backgroundColor: bColor,
                  color: fColor,
                }}
                onChange={(event) => {
                  changeStatus(event.target.value, params.row._id);
                }}
                value={params.value}
                name="status"
              >
                {statusData?.map((v) => (
                  <MenuItem key={v.label} value={v.label}>
                    {v.label}
                  </MenuItem>
                ))}
              </Select>
            </ThemeProvider>

                        // <Box
                        //   sx={{
                        //     backgroundColor: bColor,
                        //     color: fColor,
                        //     borderRadius: "15px",
                        //     padding: "5px 10px",
                        //   }}
                        // >
                        //   {params.row.status}
                        // </Box>
                    );
                },
            },
            // {
            //     field: "avatar",
            //     sortable: false,
            //     disableColumnMenu: true,
            //     headerName: "Avatar",
            //     sortable: false,
            //     disableColumnMenu: true,
            //     width: 70,
            //     renderCell: (params) => {
            //         if (params.row.isGroup) {
            //             return;
            //         }
            //         return (
            //             <>
            //                 <Avatar
            //                     src={params.row.avatar}
            //                     sx={{
            //                         position: "absolute",
            //                         bgcolor: "#" + params.row.randomColor,
            //                         "&.MuiDataGrid-columnHeaderTitle": {
            //                             position: "absolute",
            //                         },
            //                     }}
            //                 >
            //                     {params.row?.firstName?.charAt(0)}
            //                     {params.row?.lastName?.charAt(0)}
            //                 </Avatar>
            //             </>
            //         );
            //     },
            // },
            
            {
                field: "actions1",
                sortable: false,
                disableColumnMenu: true,
                type: "actions",
                headerName: "Note",
                width: 90,
                getActions: (params) => {
                    try {
                        if (params.row.isGroup) {
                            return [];
                        } else
                            return [
                                <>
                                    {params.row.note && params.row.note.trim() !== "" && (
                                        <Tooltip title="View Note">
                                            <GridActionsCellItem
                                                icon={<VisibilityIcon />}
                                                label="View"
                                                onClick={() => handleOpenViewNote(params.row)}
                                            />
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Add Note">
                                        <GridActionsCellItem
                                            icon={<AddCircleOutlineIcon />}
                                            label="Note"
                                            onClick={() => handleOpen(params.row)}
                                        />
                                    </Tooltip>
                                </>,
                            ];
                    } catch (err) {
                        console.log(err);
                    }
                },
            },
            {
                field: "actions2",
                sortable: false,
                disableColumnMenu: true,
                type: "actions",
                width: 90,
                getActions: (params) => {
                    try {
                        if (params.row.isGroup) {
                            return [];
                        } else
                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit Appointment"
                                    onClick={() => {
                                        setSelectedAppointments(params.row); // Set the selected Client
                                        setOpenUpdateAppointments(true); // Open the UpdateClient dialog
                                    }}
                                    showInMenu
                                />,
                            ];
                    } catch (err) {
                        console.log(err);
                    }
                },
            },
        ];
        setColumns(columnsData);
    }, [appointmentsRowsData, appointmentsRowsData]);


    async function changeStatus(value, id) {
        // update status 
        // console.log(value);
        // console.log(id);
        try {
            const response = await axios.patch(
                `${testurl}/updateAppointmentStatus/${id}`,
                {
                    status: value,
                }
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            toast.error("Failed to set status. Retry later.")
            console.error("Error updating note:", error);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            // fetch table data
            try {
                setLoading(true); // Set loading to true before data fetching
                const response = await axios.get(`${testurl}/appointments`);

                setAppointmentsRowsData(response.data.data)
                setOriginalAppointmentsRowsData(response.data.data)
                

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch Appointments. Retry later.");
        console.error("There was an error!", error);
        setLoading(true);
      }
    };

    fetchData();
  }, [appointmentsListUpdate]);

  const handleOpen = (rowData) => {
    // debugger;
    setOpen(true);
    setSelectedRowId(rowData._id);
    // Preset the current note if it already exists
    setCurrentNote(rowData.note || "");
  };
  const handleOpenViewNote = (rowData) => {
    setSelectedRowId(rowData._id);
    setSelectedRowNote(rowData.note || ""); // Use the note from rowData
    setOpenViewNote(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseViewNote = () => {
    setOpenViewNote(false);
  };

    const handleCloseCreateAppointments = () => {
        console.log("appointment closed");
        setOpenCreateAppointments(false);
    };

  const handleNoteSubmit = async () => {
    // Update the note in your rows data - you need to manage this state or update the backend
    const updatedRows = appointmentsRowsData.map((row) => {
      if (row.id === selectedRowId) {
        return { ...row, note: currentNote };
      }
      return row;
    });
    setAppointmentsRowsData(updatedRows);

    //  UPDATE NOTE IN BACKEND
    try {
      console.log(selectedRowId);
      console.log(currentNote);
      const response = await axios.patch(
        `${testurl}/updateAppointmentNote/${selectedRowId}`,
        {
          note: currentNote,
        }
      );
      handleClose();
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to change status. Retry later.");
      console.error("Error updating note:", error);
    }
  };

  // const toggleAdmin = useCallback(
  // 	(id) => () => {
  // 		setAppointmentsRowsData((prevRows) =>
  // 			prevRows.map((row) =>
  // 				row.id === id ? { ...row, isAdmin: !row.isAdmin } : row
  // 			)
  // 		);
  // 	},
  // 	[]
  // );

  //Adding callback for appointments list update
  const addAppointments = (newAppointments) => {
    setAppointmentsListUpdate((prevAppointments) => [
      ...prevAppointments,
      newAppointments,
    ]);
    // console.log(appointmentsListUpdate);
  };
  function getStatus(params) {
    return params.row.status || "";
  }

  //dropdown status
  async function setStatus(params) {
    let value = params.value;
    let users;
    users = appointmentsRowsData;

    users.forEach((row) => {
      if (row.id === undefined) {
        console.error("Row does not have an id:", row);
      } else if (params.row.id === row.id) {
        row.status = params.value;
        params.row.status = params.value;
      }
    });

    // if (!params.row.id) {
    // 	console.error("Row does not have an id:", params.row);
    // 	return params.row;
    // }

    // return { ...params.row, id: params.row.id, value };
  }

  const preprocessRows = (rows) => {
    const withDateHeaders = [];
    const datesAdded = new Set();
    // console.log(rows);
    rows.forEach((row, index) => {
      if (!datesAdded.has(row.date)) {
        withDateHeaders.push({
          id: `header-${row.date}`,
          date: row.date,
          isGroup: true,
        });
        datesAdded.add(row.date);
      }
      withDateHeaders.push({
        id: row._id || `row-${index}`,
        ...row,
        isGroup: false,
      });
    });

    return withDateHeaders;
  };

  // const rowsWithHeaders = preprocessRows(appointmentsRowsData);
  let rowsWithHeaders;
  rowsWithHeaders = preprocessRows(appointmentsRowsData);

  const requestSearch = (event) => {
    // get search value
    const searchValue = event.target.value.toLowerCase();
    // set search value in filter
    setUserFilterName(searchValue);

    // then return only filtered rows that matches search

        const filtered = originalAppointmentsRowsData.filter((row) => {
            return (
                row.tutorName.toLowerCase().includes(searchValue) ||
                row.clientName.toLowerCase().includes(searchValue) ||
                row.service.toLowerCase().includes(searchValue) 
            );

        });

    setAppointmentsRowsData(filtered);
  };

  // const rowCountsPerDate = setAppointmentsRowsData.reduce((acc, row) => {
  //   acc[row.date] = (acc[row.date] || 0) + 1;
  //   return acc;
  // }, {});

  const handleDateAccept = (dateRange) => {
    const [start, end] = dateRange;

    setDateRange([start, end]);

    // Filter rows between the start and end dates
    const filtered = originalAppointmentsRowsData.filter((row) => {
      const rowDate = new Date(row.date);
      return (!start || rowDate >= start) && (!end || rowDate <= end);
    });

    setAppointmentsRowsData(filtered);
  };

  const deleteSelectedUsers = async () => {
    // Get the IDs of the selected clients
    const selectedIds = selectedRows; // selectedRows is already an array of IDs

    try {
      const response = await axios.delete(`${testurl}/appointment`, {
        data: selectedIds,
      });
      window.location.reload();
    } catch (error) {
      // If an error occurs, display a toast message
      toast.error("Failed to delete appointments. Retry later.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0 && selectedRows[0] !== null) {
      setDeleteFlag(false);
    } else {
      setDeleteFlag(true);
    }
  }, [selectedRows]);
  // <DateComponent handleDateAccept={handleDateAccept} />;
  return (
    <main className="background-container">
      <section className="max-w-[1400px] mx-auto min-h-screen">
        x
        <div className="home flex h-full">
            {/* This is Side Bar */}
            <SideBar className="w-20 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 flex-shrink-0"/>
            <div className="homeContainer">
                {/* This is NavBar */}
                {/* <NavBar /> */}
                <div className="w-auto" style={{ padding: 20 }}>
                    <div
                        style={{
                            display: "flex",    
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: '10px',
                            marginTop: '0px',
                        }}
                    >

                        {/* It is search bar component */}
                        <TextField
                            type={"search"}
                            sx={{
                                "& legend": { display: "none" },
                                "& fieldset": { top: 0 },
                                width: {
                                    xl: "70%",
                                    lg: "70%",
                                    md: "70%",
                                    sm: "70%",
                                    xs: "70%",
                                },
                            }}
                            placeholder="Search"
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            value={userFilterName}
                            onChange={requestSearch}
                            // onKeyPress={requestSearch}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* This is Date Component */}
                        <DateComponent handleDateAccept={handleDateAccept} />
                    </div>
                    <div>

                    </div>
                    <div style={{ height: "auto", width: "100%" }}>
                        {/* <Button variant="contained">Contained</Button> */}
                        {/* Create Client Button */}
                        {/* <Box sx={{ width: '100%' }}> */}

                {/* </Box> */}
                <Button
                  onClick={() => setOpenCreateAppointments(true)} // open create appointments
                  variant="contained"
                  // disabled={deleteFlag}
                  sx={{
                    position: "absolute",
                    left: "1000px",
                    width: "15em",
                    padding: "5px",
                    zIndex: 1,
                  }}
                >
                  <AddIcon />
                  Create Appointments
                </Button>
                {/* Delete Client Button */}
                <Button
                  onClick={deleteSelectedUsers} // make array of id to be deleted
                  disabled={deleteFlag} // we disabled this button
                  variant="outlined"
                  // disabled={deleteFlag}
                  sx={{
                    color: "#e24d4d",
                    position: "absolute",
                    borderColor: "#e24d4d",
                    left: "780px",
                    width: "15em",
                    padding: "5px",
                    zIndex: 1,
                  }}
                >
                  <DeleteIcon />
                  Delete Appointments
                </Button>

                {/* Total Client time */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      color: "#757575",
                      marginBottom: "15px",
                    }}
                  >
                    Appointments ({appointmentsRowsData.length})
                  </Typography>
                  {/* Switch Tab */}
                  {/* <Box>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Parents" {...a11yProps(0)} />
                                    <Tab label="Students" {...a11yProps(1)} />
                                </Tabs>
                            </Box> */}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <DataGrid
                      hideFooter
                      initialState={{
                        ...statusData.initialState,
                        // pagination: { paginationModel: { pageSize: 5 } },
                        columns: {
                          columnVisibilityModel: {
                            date: false,
                          },
                        },
                      }}
                      // pageSizeOptions={[5, 10, 25]}

                      isRowSelectable={(params) => {
                        return !params.row.isGroup;
                      }}
                      onRowClick={(params, event) => {
                        // If the row is a group header, stop the click from doing anything
                        if (params.row.isGroup) {
                          event.preventDefault();
                        }
                      }}
                      slots={{ toolbar: GridToolbar }}
                      getRowClassName={(params) =>
                        params.row.isGroup ? "date-header-row" : ""
                      }
                      components={{
                        // Override the default checkbox rendering
                        BaseCheckbox: (props) => {
                          // If the row is a group header, do not render a checkbox
                          if (props.row.isGroup) {
                            return null;
                          }
                        },
                      }}
                      rows={rowsWithHeaders}
                      columns={columns.map((column) => ({
                        ...column,
                      }))}
                      checkboxSelection
                      disableSelectionOnClick
                      // onRowSelectionModelChange={}
                      // selectionModel={selectionModel}
                      filterModel={filterModel}
                      onFilterModelChange={setFilterModel}
                      onRowSelectionModelChange={(rows) => {
                        setSelectedRows(rows);
                        setSelectionModel(rows);

                        setRenderFlag(!renderFlag);
                      }}
                      sx={{
                        ".MuiDataGrid-row": {
                          width: "100%",
                        },
                        ".date-header-row .MuiDataGrid-cellCheckbox": {
                          display: "none",
                        },
                        ".date-header-row": {
                          backgroundColor:
                            "#f0f0f0" /* Your desired background color for the date row */,
                        },
                        ".group-header-row": {
                          backgroundColor: "#f0f0f0",
                          fontWeight: "bold",
                        },

                                        "& .MuiDataGrid-columnHeaderTitle": {
                                            position: "absolute",
                                            fontWeight: "bold",
                                        },
                                        "&.MuiDataGrid-root .MuiDataGrid-iconSeparator": {
                                            display: "none",
                                        },
                                        "&.MuiDataGrid-root": {
                                            overflowY: "auto",
                                        },
                                        justifyContent: "center",
                                        width: "100%",
                                        borderTop: 0,
                                        overflow: "scroll",
                                        scrolling: {
                                            columnRenderingMode: "virtual",
                                        },
                                    }}
                                />
                            )}
                        </div>
                        <div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Add Note"
                                        multiline
                                        rows={4}
                                        value={currentNote}
                                        onChange={(e) => setCurrentNote(e.target.value)}
                                        sx={{ width: "100%" }}
                                    />
                                    <Button onClick={handleNoteSubmit}>Save Note</Button>
                                </Box>
                            </Modal>
                        </div>
                        <div>
                            <Modal
                                open={openViewNote}
                                onClose={handleCloseViewNote}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        {selectedRowNote}
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                        <div>
                            <Modal
                                open={openCreateAppointments}
                                onClose={handleCloseCreateAppointments}
                            >
                                <Box sx={createAppointmentsStyle}>
                                    <CreateAppointments
                                        appointmentsListUpdate={addAppointments}
                                        handleCloseCreateAppointments={handleCloseCreateAppointments}
                                        tutors={tutors}
                                        clients={clients}
                                    />
                                </Box>
                            </Modal>
                            <Modal
                                open={openUpdateAppointments}
                                onClose={() => setOpenUpdateAppointments(false)}
                            >
                                <Box sx={createAppointmentsStyle}>
                                    <UpdateAppointments
                                        appointments={selectedAppointments}
                                        appointmentsListUpdate={addAppointments}
                                        // handleCloseUpdateAppointments={openUpdateAppointments}
                                        handleCloseUpdate={() =>
                                            setOpenUpdateAppointments(false)
                                        }
                                        tutors={tutors}
                                        clients={clients}
                                    />
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};

export default Appointments;

