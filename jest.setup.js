// Import necessary libraries
import '@testing-library/jest-dom'; 
global.BroadcastChannel = class {
  postMessage() {}
  close() {}
};
import { TextEncoder, TextDecoder } from 'util'; // Only import once
import { Response, Request } from 'node-fetch'; // Import Response and Request from node-fetch

// Mock the global objects
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Response = Response;  // Now properly mock the Response object
global.Request = Request;    // Mock the Request object

// Optionally mock fetch if necessary
global.fetch = require('node-fetch');
