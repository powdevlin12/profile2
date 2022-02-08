import axios from 'axios'

export const getContact = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/contacts");
        return response.data.contact;
    } catch (error) {
        console.log(error);
    }
}

export const getAccount = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/accounts");
        return response.data.account;
    } catch (error) {
        console.log(error);
    }
}

export const getProject = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/projects");
        return response.data.project;
    } catch (error) {
        console.log(error);
    }
}