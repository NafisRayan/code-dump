import dayjs from 'dayjs'; 

// Function to disable certain dates
const shouldDisableDate = (date) => {
    // Disable Sundays
    if (date.day() === 0) {
        return true;
    }

    // Disable dates outside the range of July 1 to August 15
    if (date.isBefore(dayjs('2024-07-09')) || date.isAfter(dayjs('2024-08-16'))) {
        return true;
    }

    return false;
};

export default shouldDisableDate;
