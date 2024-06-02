import axios from 'axios';

export default axios.create({
    baseURL: 'http://budgetbooze.ca/api'
});