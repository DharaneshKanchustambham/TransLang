// import React from 'react';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

// function Sample() {
//   const fruitList = ['Apple', 'Banana', 'Orange', 'Grape', 'Pineapple'];

//   return (
//     <Box sx={{ width: 300 }}>
//       <TextField
//         id="fruit-list"
//         label="List of Fruits"
//         multiline
//         value={fruitList.map(fruit => `- ${fruit}`).join('\n')}
//         variant="outlined"
//       />
//     </Box>
//   );
// }

// export default Sample;


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function Sample() {
  const matches = [
    {
      "id": "433966084",
      "segment": "i am going",
      "translation": "मैं हर पल मौजूद रहूँगा",
      "source": "en-US",
      "target": "hi-IN",
      "quality": "100",
      "reference": null,
      "usage-count": 2,
      "subject": "",
      "created-by": "MateCat",
      "last-updated-by": "",
      "create-date": "2022-04-09 05:01:11",
      "last-update-date": "2022-04-09 05:01:11",
      "match": 0.99
    },
    {
      "id": "433355711",
      "segment": "i am going",
      "translation": "वह खाना नही नही खा रहा है",
      "source": "en-US",
      "target": "hi-IN",
      "quality": "100",
      "reference": null,
      "usage-count": 2,
      "subject": "",
      "created-by": "MateCat",
      "last-updated-by": "",
      "create-date": "2021-09-17 07:30:13",
      "last-update-date": "2021-09-17 07:30:13",
      "match": 0.98
    },
    {
      "id": "433328405",
      "segment": "I am going",
      "translation": "आप सुबह टहलने जाते हैं",
      "source": "en-US",
      "target": "hi-IN",
      "quality": "100",
      "reference": null,
      "usage-count": 2,
      "subject": "",
      "created-by": "MateCat",
      "last-updated-by": "",
      "create-date": "2021-09-04 16:30:02",
      "last-update-date": "2021-09-04 16:30:02",
      "match": 0.97
    }
  ];

  const [updatedState, setUpdatedState] = useState({});

  const updateState = () => {
    const newState = {};
    matches.forEach(match => {
      newState[match.id] = match.translation;
    });
    setUpdatedState(newState);
  };

  return (
    <div>
      <button onClick={updateState}>Update State</button>
      <TextField
        id="updated-state"
        label="Updated State"
        multiline
        value={Object.entries(updatedState).map(([key, value]) => `${value}`).join('\n')}
        variant="outlined"
      />
    </div>
  );
}

export default Sample;

