import axios from 'axios';

export default axios.create({
    baseURL: 'https://budgetbooze.ca/api'
});