"use client"
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios'
import { testurl } from '@/constant.js';
import AddIcon from "@mui/icons-material/Add";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import CreateAppointments from "@/app/components/CreateAppointments";
import SideBar from "@/app/components/SideBar";
import CreateEvents from "@/app/components/CreateEvent";
import Image from 'next/image'
import { toast } from "react-toastify";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack,
    Box,
    IconButton,
    Button,
    Modal
} from "@mui/material";
import avatargirl from "../../../../public/avatargirl.jpg"
import useStore from "@/store";
import Login from "@/app/components/Login";
import {
    deepOrange,
    deepPurple,
    amber,
    blue,
    cyan,
    green,
    indigo,
    pink,
    red,
} from '@mui/material/colors';


const localizer = momentLocalizer(moment);

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

const Calender = () => {

    // STORE
    const { data, isLoading, fetchData } = useStore();
    // USE STATES
    const [appointments, setAppointments] = useState([]);
    const [appointmentsListUpdate, setAppointmentsListUpdate] = useState([]);
    const [eventsListUpdate, setEventsListUpdate] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState("all");
    const [selectedClient, setSelectedClient] = useState("all");
    const [openCreateAppointments, setOpenCreateAppointments] = useState(false);
    const [openCreateEvents, setOpenCreateEvents] = useState(false);
    const [clients, setClients] = useState([]);
    const [clientsD, setClientsD] = useState([]);
    const [appointmentsClients, setAppointmentsClients] = useState([]);
    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const [colors, setColors] = useState([]);

    // HANLDE IMAGE SLIDER
    const handlePrev = () => {
        setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setIndex((prevIndex) => Math.min(prevIndex + 1, clients.length - 1));
    };

    // USE STATES FETCHING DATA FROM ZUSTAND
    useEffect(() => {
        if (!isLoading) {
            const transformedAppointments = transformAppointments(data.appointmentsData.data);
            setAppointments(transformedAppointments);
            setTutors(data.employeesData.data);
            setClients(data.clientsData.data);
            setClientsD(data.clientsData.data);
            const transformdEvents = transformEvents(data.eventsData.data)
            setEvents(transformdEvents);
            setAppointmentsClients(data.appointmentsClientsData.data)
        }
    }, [isLoading]);

    useEffect(() => {
        fetchData();
    }, []);

    // GET UPDATED APPOINTMENTS 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${testurl}/appointments`);
                const transformedAppointments = transformAppointments(response.data.data);
                setAppointments(transformedAppointments);

            } catch (error) {
                toast.error("Failed to fetch Appointments. Retry later.")
                console.error("There was an error!", error);
            }
        };

        fetchData();
    }, [appointmentsListUpdate]);

    // GET UPDATED EVENTS 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${testurl}/events`);
                const transformdEvents = transformEvents(response.data.data)
                setEvents(transformdEvents);

            } catch (error) {
                toast.error("Failed to fetch Appointments. Retry later.")
                console.error("There was an error!", error);
            }
        };

        fetchData();
    }, [eventsListUpdate]);


    // FILTER COMPONENT
    const getFilteredAppointments = () => {
        if (selectedTutor === "all") {
            return appointments;
        }
        const filtered = appointments.filter((appointment) => {
            return appointment.tutorId === selectedTutor;
        });
        return filtered;
    };

    // GET EMPLOYEES CLIENTS
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedTutor === "all") {
                    setClients(data.clientsData.data);
                    return
                }
                const response = await axios.get(`${testurl}/getEmployeesClients/${selectedTutor}`);
                setClients(response.data.data[0].clients);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedTutor]);

    // GET CLIENTS EMPLOYEES
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedClient === "all") {
                    setClients(data.clientsData.data);
                    return
                }
                const response = await axios.get(`${testurl}/getClientsEmployees/${selectedClient}`);
                setClients(response.data.data[0].tutors);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedClient]);

    // TRANFORM EVENTS
    const transformEvents = (events) => {
        return events.map((event) => ({
            id: event._id,
            title: event.title,
            description: event.description,
            start: new Date(event.date),
            end: new Date(event.date),
        }));
    };

    // TRANFORM APPOINTMENT
    const transformAppointments = (appointments) => {
        return appointments.map((appointment) => ({
            id: appointment._id,
            title: "Appointment",
            start: new Date(appointment.date),
            end: new Date(appointment.date),
            tutorName: appointment.tutorName,
            tutorId: appointment.tutor,
            clients: appointment.clients,
        }));
    };

    // ADD FUNCTIONS FOR CREATION COMPONENTS
    const addAppointments = (newAppointments) => {
        setAppointmentsListUpdate((prevAppointments) => [
            ...prevAppointments,
            newAppointments,
        ]);
    };
    const addEvents = (newEvents) => {
        setEventsListUpdate((prevEvents) => [
            ...prevEvents,
            newEvents,
        ]);
    };

    // FUCTION HANDLERS
    const handleCloseCreateAppointments = () => {
        setOpenCreateAppointments(false);
    };
    const handleCloseCreateEvents = () => {
        setOpenCreateEvents(false);
    };

    const images = [
        "/avatar1.jpg",
        "/avatar2.jpg",
        "/avatar3.jpg",
        "/avatar4.jpg",
        "/avatar5.jpg",
        "/avatar6.jpg",
        "/avatar7.jpg",
        "/avatar8.jpg",
        "/avatar9.jpg",
    ]

    const colorsArr = [
        deepOrange[500],
        deepPurple[500],
        amber[500],
        blue[500],
        cyan[500],
        green[500],
        indigo[500],
        pink[500],
        red[500],
    ]
    // FOR AVATARS
    useEffect(() => {
        // Reset the countRef whenever the index changes
        countRef.current = index;
        setCount(index);
    }, [index]);

    useEffect(() => {
        const generateColors = () => {
          const newColors = [];
          for (let i = 0; i < clients.length; i++) {
            newColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
          }
          setColors(newColors);
        };
        generateColors();
      }, [clients]);


  return (
    <main className="home flex">
         <SideBar className="w-36 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 flex-shrink-0"/>
      <section className="max-w-[1400px] pt-12 min-h-screen">
        <div className="calender" style={{ paddingLeft: '10px', paddingRight: "10px" }}>
            <div className="calenderContainer" >


                <div className="flex justify-center items-center" style={{ marginBottom: '10px', marginTop: '70px', }}>
                    <IconButton onClick={handlePrev} disabled={index === 0}>
                        <MdOutlineArrowBackIosNew size={30} />
                    </IconButton>
                    {/* <Stack direction="row" spacing={2}>
                        {clients && clients.slice(index, index + 5).map((client, i) => {
                            // Generate a random color for the outline
                            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

                            // Increment the countRef and update the state
                            const currentCount = countRef.current;
                            countRef.current += 1;

                            return (
                                <div className="flex flex-col justify-center items-center" key={i}>
                                    <div style={{ border: `4px solid ${randomColor}`, borderRadius: '50%' }}> */}
                    {/* <Avatar alt={client.firstName} src={images[currentCount]} sx={{ width: 56, height: 56 }} /> */}
                    {/* <Avatar alt={client.firstName} sx={{  bgcolor: colors[currentCount] , width: 56, height: 56}} >{`${client.firstName.charAt(0)}${client.firstName.charAt(1).toUpperCase()}`}</Avatar>
                                    </div>
                                    <div>{client.firstName.toUpperCase()}</div>
                                </div>
                            );
                        })}
                    </Stack> */}
                    <Stack direction="row" spacing={2}>
                        {clients && clients.slice(index, index + 5).map((client, i) => {
                            return (
                                <div className="flex flex-col justify-center items-center" key={i}>
                                    <div style={{ border: `4px solid ${colors[i]}`, borderRadius: '50%' }}>
                                        <Avatar
                                            alt={client.firstName}
                                            sx={{ bgcolor: colorsArr[i], width: 56, height: 56 }}
                                        >
                                            {`${client.firstName.charAt(0)}${client.firstName.charAt(1).toUpperCase()}`}
                                        </Avatar>
                                    </div>
                                    <div>{client.firstName.toUpperCase()}</div>
                                </div>
                            );
                        })}
                    </Stack>
                    <IconButton onClick={handleNext} disabled={index >= clients.length - 5}>
                        <MdOutlineArrowForwardIos size={30} />
                    </IconButton>
                </div>
                {/* DROPDOWN SECTION */}
                <div className="flex items-center justify-between w-full px-6">
                    <div className="flex flex-row ">
                        <Box className="mr-4" sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="tutor-select-label">Tutor</InputLabel>
                                <Select
                                    labelId="tutor-select-label"
                                    id="tutor-select"
                                    name="filter"
                                    // value={selectedTutor}
                                    defaultValue="all"
                                    label="Tutor"
                                    onChange={(e) => {
                                        setSelectedTutor(e.target.value);
                                    }}
                                >
                                    <MenuItem value="all">
                                        <span className="text-gray-600">SHOW ALL</span>
                                    </MenuItem>
                                    {tutors.map((tutor, index) => (
                                        <MenuItem key={index} value={tutor._id}>
                                            <span className="text-gray-600">{tutor.firstName.toUpperCase()}</span>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="mr-4" sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="client-select-label">Client</InputLabel>
                                <Select
                                    labelId="client-select-label"
                                    id="client-select"
                                    name="filter"
                                    // value={selectedClient}
                                    defaultValue="all"
                                    label="Client"
                                    onChange={(e) => {
                                        setSelectedClient(e.target.value);
                                    }}
                                >
                                    <MenuItem value="all">
                                        <span className="text-gray-600">SHOW ALL</span>
                                    </MenuItem>
                                    {clientsD.map((client, index) => (
                                        <MenuItem key={index} value={client._id}>
                                            <span className="text-gray-600">{client.firstName.toUpperCase()}</span>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={() => setOpenCreateAppointments(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 "
                        >
                            <AddIcon />
                            Create Appointment
                        </Button>
                        <Button
                            onClick={() => setOpenCreateEvents(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mr-3 "
                        >
                            <AddIcon />
                            Create Event
                        </Button>
                    </div>
                </div>
            </div>

            {/* CALENDER SECTION */}
            <div className="bottom mt-6">
                <div className="calenderContents">
                    <Calendar
                        localizer={localizer}
                        startAccessor="start"
                        endAccessor="end"
                        events={[...getFilteredAppointments(), ...events]}
                        style={{ height: 600,width: 1050 }}
                        components={{
                            event: (event) => {

                                if (event.event.title !== "Appointment") {
                                    return <p>{event.event.title.toUpperCase()}</p>;
                                }

                                const matchingAppointmentsClient = appointmentsClients.find((ac) => ac._id === event.event.id);

                                if (matchingAppointmentsClient) {
                                    return (
                                        <AvatarGroup
                                            total={matchingAppointmentsClient.clients.length}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                {matchingAppointmentsClient.clients.map((client, index) => (
                                                    <p key={index} className="w-full">{client}</p>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap items-center justify-center">
                                                <div className="flex">
                                                    <Avatar alt={"client"} src={images[0]} sx={{ width: 50, height: 50 }} />
                                                    <Avatar alt={"client"} src={images[1]} sx={{ width: 50, height: 50 }} />
                                                </div>
                                            </div>
                                        </AvatarGroup>
                                    );
                                }
                                return null;
                            },
                        }}
                        eventPropGetter={(event) => {
                            return { style: { backgroundColor: 'blue' } };
                        }}
                    />



                </div>
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
                    open={openCreateEvents}
                    onClose={handleCloseCreateEvents}
                >
                    <Box sx={createAppointmentsStyle}>
                        <CreateEvents
                            eventsListUpdate={addEvents}
                            handleCloseCreateEvents={handleCloseCreateEvents}
                        />
                    </Box>
                </Modal>
            </div>
        </div>

    </section>
    </main>


    )
}

export default Calender;
// DATES
// July 8th - August 17th
// 16th - Last Date
// Exclude: Sunday 13-June 20-June 27-June 3-July 10-July

// ENGLISH TUTORS
// Bushra - 10am-2pm and 3pm-7pm
// Samiha - 10am-2pm and 3pm-7pm
// Umaira - 10am-2pm and 3pm-7pm
// Reem - 10am-2pm and 3pm-7pm
// Hilda - 10am-2pm and 3pm-7pm

// MON - SAT

// LOCATIONS
// Bushra’s Location - https://app.sessions.us/room/bushra-room
// Umaira’s Room - https://app.sessions.us/room/umaira-room
// Reem - https://app.sessions.us/room/college-mastermind-dab28/reems-room
// Samiha’s Room - https://app.sessions.us/room/samiha-room
// Hilda’s room - https://app.sessions.us/room/hilda-room


// Family Support Manager
// Hilda - 10am-2pm and 3pm-7pm M- Sat