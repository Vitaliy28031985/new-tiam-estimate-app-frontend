import axios from 'axios';
import BASE_URL from './base';
import { Price, UpdatePrice } from '../interfaces/PriceInterface';

export async function getAllPrices(): Promise<Price[] | null> {

    const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/prices`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const priceData: Price[] = response.data;
    return priceData;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  } 
}

export async function updatePrice(data: UpdatePrice) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'put',
      url: `${BASE_URL}api/prices/${data.id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          price: Number(data.price),
          title: data.title,
        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}