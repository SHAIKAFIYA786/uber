// maps.service.js
const axios = require('axios');

// module.exports.getAddressCoordinate = async (address) => {4
//   const apiKey = process.env.GOOGLE_API_KEY; // Store your API key in .env for security
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
//   try {
//     const response = await axios.get(url);
//     if (response.data.status === 'OK') {
//       // Extract latitude and longitude
//       const location = response.data.results[0].geometry.location;
//       return {
//         lat: location.lat,
//         lng: location.lng,
//       };
//     } else {
//       throw new Error('Unable to fetch coordinates');
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_API_KEY;

  // Return default data if API key is empty or address is missing
  if (!apiKey || apiKey.trim() === '' || !address) {
    return {
      lat: 12.9716, // Example default: Bangalore
      lng: 77.5946,
      default: true,
      message: 'API key was empty. Returned default coordinates for testing.',
    };
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        default: false,
      };
    } else {
      return {
        lat: 12.9716,
        lng: 77.5946,
        default: true,
        message: `Google API responded with status: ${response.data.status}. Returned default coordinates.`,
      };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return {
      lat: 12.9716,
      lng: 77.5946,
      default: true,
      message: 'Error occurred while calling Google Maps API. Returned default coordinates.',
    };
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_API_KEY; // Store your API key in .env for security
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return {
                distance: response.data.rows[0].elements[0].distance.text,
                duration: response.data.rows[0].elements[0].duration.text,
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input query is required');
    }

    const apiKey = process.env.GOOGLE_API_KEY; // Store your API key in .env for security
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};
  