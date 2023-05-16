import axios from 'axios';

const dataBase = axios.create({
    baseURL: 'https://apikey-v2-1fwqgue4yu3vzioly2tdndaf1jcqib8ypkad19su3wik:40533fe868dff60a0b1662c1e4056375@8f28faa5-e080-4c10-aefd-ccff50aa3382-bluemix.cloudantnosqldb.appdomain.cloud/agendamento_barber_assist/'
})

export default dataBase;