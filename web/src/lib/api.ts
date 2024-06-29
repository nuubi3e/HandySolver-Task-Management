import { Task } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class API {
  static BASE_URL = 'http://localhost:5001/';
  endpoint: string;
  url: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.url = `${API.BASE_URL}${endpoint}`;
  }

  async connect(info: RequestInit) {
    let success = true;
    let data: Task[] | Task | null = null;
    let message: string = '';

    console.log('Method:', info.method);
    console.log('body: ', info.body);
    console.log('url: ', this.url);

    try {
      const res = await fetch(this.url, info);

      if (!res.ok) throw new Error('Something went wrong!');

      data = await res.json();

      console.log('RES: ', data);
    } catch (err: any) {
      success = false;
      data = null;
      message = err.message;
    }

    return {
      success,
      data,
      message,
    };
  }
}
