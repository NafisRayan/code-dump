import React, { useState } from "react";
import axios from "axios";
import { testurl, datesArray, zoomLinks } from "@/constant.js";
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Stack,
} from "@mui/material";
import {
    LocalizationProvider,
    TimePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import dayjs from 'dayjs';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import shouldDisableDate from "@/helpers"

const CreateEvents = ({
    handleCloseCreateEvents,
    eventsListUpdate
}) => {

    // USE STATES
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        zoomLink: "",
        startTime: dayjs().hour(10).minute(0),
        endTime: dayjs().hour(10).minute(0),
        date: dayjs('2024-07-08'),
    })

    // HANDLE CHANGES
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    // SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = {
            title: formData?.title,
            description: formData?.description,
            zoomLink: formData?.zoomLink,
            startTime: formData?.startTime?.$d,
            endTime: formData?.endTime?.$d,
            date: formData?.date?.$d,
        }
        try {
            console.log(formData);
            const createdEvent = await axios.post(
                `${testurl}/createEvent`,
                event
            );

            toast.success(createdEvent.data.message.toUpperCase());


            if (!(createdEvent.status === 201)) {
                toast.error(createdEvent.data.message.toUpperCase());
                return;
            }
            eventsListUpdate(formData)
            handleCloseCreateEvents()
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
        <div
            className="flex items-center justify-center"
            sx={{ height: '349px' }}

        >
            <LocalizationProvider dateAdapter={AdapterDayjs}  >
                <form style={{ marginTop: "20px", width: '500px', height: '70%' }} onSubmit={handleSubmit}>
                    <Stack spacing={5}>
                        {/* TITLE */}
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
                            label="Title"
                            name="title"
                            type="text"
                            value={formData?.title}
                            onChange={handleChange}
                            required
                        />

                        {/* DESCRIPTION */}
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
                            label="Description"
                            name="description"
                            type="text"
                            value={formData?.description}
                            onChange={handleChange}
                            required
                        />
                        {/* ZOOM LINKS */}
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
                            required
                        >
                            <InputLabel id="zoom-link-label">Zoom Link</InputLabel>
                            <Select
                                labelId="zoom-link-label"
                                name="zoomLink"
                                value={formData?.zoomLink}
                                label="Zoom Link"
                                onChange={handleChange}
                            >
                                {zoomLinks.map((link, index) => (
                                    <MenuItem key={index} value={link}>
                                        {link}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* DATE PICKER */}
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
                                    value={formData?.date} // provide a default value
                                    onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                                    disablePast
                                    views={['year', 'month', 'day']}
                                    shouldDisableDate={shouldDisableDate}
                                />
                            </DemoItem>
                        </DemoContainer>

                        {/* START TIME */}
                        <TimePicker
                            name="time"
                            label="StartTime"
                            value={formData?.startTime}  // provide a default value
                            onChange={(newValue) => setFormData({ ...formData, startTime: newValue })}
                            shouldDisableTime={(value, view) =>
                                view === 'hours' && !(value.hour() > 9 && value.hour() < 15) && !(value.hour() > 14 && value.hour() < 20)
                            }

                            views={['hours', 'minutes']}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {/* <TimePicker
                            sx={{
                                ".MuiInputBase-input": {
                                    height: "10px",
                                },
                                ".MuiFormLabel-root": {
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                },
                            }}
                            label="Start Time"
                            name="startTime"
                            value={dayjs(formData?.startTime)}
                            onChange={(newValue) => {
                                setFormData({ ...formData, startTime: newValue.$d })
                            }
                            }
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        */}

                        {/* END TIME */}
                        <TimePicker
                            name="time"
                            label="End Time"
                            value={formData?.endTime}  // provide a default value
                            onChange={(newValue) => setFormData({ ...formData, endTime: newValue })}
                            shouldDisableTime={(value, view) =>
                                view === 'hours' && !(value.hour() > 9 && value.hour() < 15) && !(value.hour() > 14 && value.hour() < 20)
                            }

                            views={['hours', 'minutes']}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {/* <TimePicker
                            sx={{
                                ".MuiInputBase-input": {
                                    height: "10px",
                                },
                                ".MuiFormLabel-root": {
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                },
                            }}
                            label="End Time"
                            name="endTime"
                            value={dayjs(formData?.endTime)}
                            onChange={(newValue) => {
                                setFormData({ ...formData, endTime: newValue.$d })
                            }
                            }
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />  */}

                        <Button
                            type="submit"
                            variant="contained"
                        // onClick={handleCloseCreateAppointments}
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </LocalizationProvider >
        </div>
    );
};

export default CreateEvents;


