// importing the dotenv package.
import dotenv from 'dotenv';

// dotenv gives us a function config() which will read all the environment variables from the .env file.
// load all the environment variables from the .env file.
dotenv.config();

console.log("PORT from .env :",process.env.PORT);

// this line means either we configure the port value in the environment variable else if not then take the port value as 4000. (its just a simple shortcircutting)... if port is not define in .env file then take 4000 as value if we define the port value in .env file then skip it since it is || or logical operator.
export const PORT=process.env.PORT || 4000; 

