# mp3-analysis-app

## Overview

The aim of this app is to create an application that accepts an MP3 file and responds with the number of frames in the file.

## Getting Started
### Prerequisites
Node.js and npm installed on your machine.
Node vesrsion used `v18.17.1`

### Installation
Clone the repository:
         
    git clone https://github.com/samreen-rashid/mp3-analysis-app.git

Install dependencies:
   
    cd mp3-analysis-app
    npm install

## Set up environment variables:
Create a .env file based on the env example below

```

PORT
PORT=

LOG
LOG_FORMAT=
LOG_DIR=../logs

CORS
ORIGIN=*
CREDENTIALS=true

```

Start the application:

     npm start

## Usage
You can use postman to test the API. Here's the cURL request attached:


      curl --location 'http://localhost:3000/api/file-upload' \
      --form 'file=@"/Users/sam/Downloads/sample.mp3"'


Select the given MP3 file in postman.
The API will return data with the frame counts in the audio sample.
