// store.js
import create from 'zustand';
import axios from 'axios';
import { testurl } from './constant';

const useStore = create((set) => ({
  data: {
    employeesData: null,
    clientsData: null,
    appointmentsData: null,
    eventsData: null,
    appointmentsClientsData: null,
  },
  isLoading: true,
  userRole: null,
  fetchData: async () => {
    try {
      const [employees, clients, appointments, events, appointmentsClients] = await Promise.all([
        axios.get(`${testurl}/employees`).then((res) => res.data),
        axios.get(`${testurl}/clients`).then((res) => res.data),
        axios.get(`${testurl}/appointments`).then((res) => res.data),
        axios.get(`${testurl}/events`).then((res) => res.data),
        axios.get(`${testurl}/appointmentsClients`).then((res) => res.data)
      ]);
      set((state) => ({
        data: {
          ...state.data,
          employeesData: employees,
          clientsData: clients,
          appointmentsData: appointments,
          eventsData: events,
          appointmentsClientsData: appointmentsClients,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  setRole: (role) => set({ userRole: role }),
}));

export default useStore;