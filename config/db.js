const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;

//mongodb atlas: loging with google and then chumkysk@gmail.com
//npm run dev

//user labib2@gmail.com, Pass: 123456
//user topu2@gmail.com, pass:123456

//How uuid

// import uuid from "uuid/v4";
// import { SET_ALERT, REMOVE_ALERT } from "./types";

// export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
//   const id = uuid;
//   dispatch({
//     type: SET_ALERT,
//     payload: { msg, alertType, id },
//   });

//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };

