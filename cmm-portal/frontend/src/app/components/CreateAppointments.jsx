import React, { useState } from "react";
import axios from "axios";
import { testurl, data, datesArray, timeSlotRanges } from "@/constant.js";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
  Checkbox
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";


import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import shouldDisableDate from "@/helpers"


const CreateAppointments = ({
  appointmentsListUpdate,
  handleCloseCreateAppointments,
  tutors,
  clients,
}) => {

  // date picker settings 
  // const startDate = dayjs('2024-07-09');
  // const endDate = dayjs('2024-08-16');

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  // USE STATES
  const [clients1, setClients1] = useState(clients)
  const [subService, setSubService] = useState([])
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [openAddCustomerDialog, setOpenAddCustomerDialog] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    service: "",
    subservice: "",
    user: "",
    status: "",
    tutor: "",
    client: [],
    title: "",
    note: "enter note here",
    duration: "",
  });
  const [newCustomerData, setNewCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    sendLoginDetails: 'no',
  });


  // HANDLE CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'service') {
      const serviceArray = (data.find(item => item[value]) || {})[value] || null;
      setSubService(serviceArray);

    }
  };
  const handleChange2 = (event) => {
    const {
      target: { name, value },
    } = event;

    setNewCustomerData({
      ...newCustomerData,
      [name]: value,
    });
  };


  const handleAddCustomer = async () => {
    try {
      // console.log(newCustomerData);
      setOpenAddCustomerDialog(false);

      const response = await axios.post(`${testurl}/createClient`, newCustomerData);

      setNewCustomerData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        sendLoginDetails: 'no',
      });

      const newData = response.data.data
      setClients1([...clients1, newData]);

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleOpenAddCustomerDialog = () => {
    setOpenAddCustomerDialog(true);
  };

  const handleCloseAddCustomerDialog = () => {
    setOpenAddCustomerDialog(false);
  };

  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedClientIds(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  // SUBMIT FORM
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Format date as "Month Day, Year"
    // const formattedDate = new Intl.DateTimeFormat("en-US", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // }).format(formData?.date);

    // Format time as "HH:MM am/pm"
    // const formattedTime = new Intl.DateTimeFormat("en-US", {
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // }).format(formData?.time);


    const appointment = {
      date: formData?.date?.$d,
      service: formData?.service,
      subservice: formData?.subservice,
      tutor: formData?.tutor,
      client: formData?.client,
      status: formData?.status,
      note: "Enter note here",
      duration: formData?.duration,
      time: formData?.time?.$d
    };

    console.log(appointment);
    try {
      const createdAppointment = await axios.post(
        `${testurl}/createAppointment`,
        { appointment, selectedClientIds }
      );

      toast.success(createdAppointment.data.message?.toUpperCase());

      if (!(createdAppointment.status === 201)) {
        toast.error(createdAppointment.data.message);
        return;
      }

      appointmentsListUpdate(appointment);
      handleCloseCreateAppointments();

    } catch (error) {
      if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {

        console.log(error.request);
      } else {

        console.log("Error", error.message);
      }
    }
  };

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <Stack spacing={2}>

          {/* DATE PICKER */}
          <DemoContainer
            components={[
              'DatePicker',
              'DateTimePicker',
              'TimePicker',
              'DateRangePicker',
              'DateTimeRangePicker',
            ]}
          >
            <DemoItem >
              <DatePicker
                name="date"
                label="Date"
                value={formData?.date || dayjs('2024-07-08')} // provide a default value
                onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                disablePast
                views={['year', 'month', 'day']}
                shouldDisableDate={shouldDisableDate}
              />
            </DemoItem>
          </DemoContainer>
          {/* <DemoItem label="TimePicker">
          <TimePicker defaultValue={todayStartOfTheDay} disablePast />
        </DemoItem>
        <DemoItem label="DateTimePicker">
          <DateTimePicker
            defaultValue={yesterday}
            disablePast
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </DemoItem>
        <DemoItem label="DateRangePicker" component="DateRangePicker">
          <DateRangePicker defaultValue={[yesterday, today]} disablePast />
        </DemoItem>
        <DemoItem label="DateTimeRangePicker" component="DateTimeRangePicker">
          <DateTimeRangePicker defaultValue={[yesterday, today]} disablePast />
        </DemoItem> */}
          {/* <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
            required
          >
            <InputLabel id="client-label">Date</InputLabel>
            <Select
              labelId="client-label"
              name="date"
              value={formData?.date}
              label="Date"
              onChange={handleChange}
               required
            >
              {
                datesArray.map((date) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl> */}

          {/* TIME PICKER */}
          {/* <FormControl sx={{ '.MuiInputBase-root': { height: '45px' }, '.MuiFormLabel-root': { fontSize: '12px', fontWeight: 'bold' } }} fullWidth required>
            <InputLabel id="time-slot-label">Time</InputLabel>
            <Select
              labelId="time-slot-label"
              name="time"
              value={formData?.time}
              label="Time"
              onChange={handleChange}
            >
              {timeSlotRanges.map((slot, index) => (
                <MenuItem key={index} value={`${slot.start}-${slot.end}`}>
                  {`${slot.start} - ${slot.end}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <TimePicker
            name="time"
            label="Time"
            value={formData?.time || dayjs().hour(10).minute(0)}  // provide a default value
            onChange={(newValue) => setFormData({ ...formData, time: newValue })}
            shouldDisableTime={(value, view) =>
              view === 'hours' && !(value.hour() > 9 && value.hour() < 15) && !(value.hour() > 14 && value.hour() < 20)
            }
            
            views={['hours', 'minutes']}
            renderInput={(params) => <TextField {...params} />}
          />

          {/* TUTOR */}
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="client-label">Tutor</InputLabel>
            <Select
              labelId="client-label"
              name="tutor"
              value={formData?.tutor}
              label="Tutor"
              onChange={handleChange}
            // required
            >
              {/* Populate these MenuItem components with Users */}
              {tutors.map((element) => {
                return (
                  <MenuItem key={element._id} value={element._id}>
                    {element.firstName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>


          {/* CLIENTS */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <FormControl sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
              fullWidth
              required
            >
              <InputLabel id="demo-multiple-checkbox-label">Clients</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedClientIds}
                onChange={handleChange3}
                input={<OutlinedInput label="Clients" />}
                renderValue={(selected) =>
                  selected.map(id => clients1.find(client => client._id === id)?.firstName.split(' ')[0]).join(', ')
                }
                MenuProps={MenuProps}
              >
                {clients1.map((client) => (
                  <MenuItem key={client._id} value={client._id}>
                    <Checkbox checked={selectedClientIds.indexOf(client._id) > -1} />
                    <ListItemText primary={client.firstName.split(' ')[0]} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={handleOpenAddCustomerDialog}
              sx={{
                padding: '0px',
                marginLeft: '8px'
              }}
            >
              <AddBoxIcon sx={{
                height: '50px',
                width: '58px',
                margin: '0px',
                padding: '0px'
              }} />
            </IconButton>
          </div>


          {/* ADD CUSTOEMR DIALOG */}
          <Dialog open={openAddCustomerDialog} onClose={handleCloseAddCustomerDialog}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent>

              {/* FIRST NAME */}
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                value={newCustomerData?.firstName}
                onChange={handleChange2}
              />

              {/* LAST NAME */}
              <TextField
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                value={newCustomerData?.lastName}
                onChange={handleChange2}
              />

              {/* EMAIL */}
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                value={newCustomerData?.email}
                onChange={handleChange2}
              />

              {/* PHONE NUMBER */}
              <TextField
                margin="dense"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                value={newCustomerData?.phoneNumber}
                onChange={handleChange2}
              />

              {/* SEND LOGIN DETAILS */}
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="send-login-details"
                  name="sendLoginDetails"
                  value={newCustomerData?.sendLoginDetails}
                  onChange={handleChange2}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Send an email with the customer’s login details" />
                  <FormControlLabel value="no" control={<Radio />} label="Do not send an email" />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddCustomerDialog}>Cancel</Button>
              <Button onClick={handleAddCustomer} variant="contained">Add</Button>
            </DialogActions>
          </Dialog>

          {/* SERVICE */}
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="service-label">Service</InputLabel>
            <Select
              labelId="service-label"
              name="service"
              value={formData?.service}
              label="Service"
              onChange={handleChange}
              required
            >
              {data.map((item, index) => {
                const key = Object.keys(item)[0];
                return (
                  <MenuItem key={index} value={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* SUB SERVICE */}
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="service-label">Sub Services</InputLabel>
            <Select
              labelId="service-label"
              name="subservice"
              value={formData?.subservice}
              label="Sub Service"
              onChange={handleChange}
              required
            >
              {subService && subService.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* DURATION */}

          <TextField
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            label="Duration"
            name="duration"
            type="number"
            value={formData?.duration}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end"></InputAdornment>,
            }}
          />
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={formData?.status}
              label="Status"
              onChange={handleChange}
              required
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Ended">Ended</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </LocalizationProvider >
  );
};

export default CreateAppointments;


