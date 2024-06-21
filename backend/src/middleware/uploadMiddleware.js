/**
 * Module to handle file uploads using the 'multer' middleware.
 * Multer is a node.js middleware for handling `multipart/form-data`, primarily used for uploading files.
 * It makes it easy to receive and process uploaded files. This module configures multer with custom storage settings
 * where the files are saved on disk (specifically in an "uploads/" directory).
 * @module multerMiddleware
 */
import multer from "multer";

/**
 * Storage configuration for Multer.
 * Configures how uploaded files are stored on the server.
 * In this case, it's set to save files in a "uploads/" directory within the root of the project folder and names them
 * based on the current date and time (Date.now()) plus their original name.
 */
const storage = multer.diskStorage({
	/**
	 * Callback function for setting the destination path where files will be stored.
	 * @function destination
	 * @param {Object} req - Express request object, containing details about the incoming HTTP request. Not used in this case.
	 * @param {Object} file - File information (including original name and mimetype).
	 * @param {Function} cb - Callback function that takes two arguments: an error or null for no errors and the destination path.
	 */
	destination: (req, file, cb) => {
		// Set files to be saved in "uploads/" directory within project root
		cb(null, "uploads/");
	},

	/**
	 * Callback function for setting the filename of uploaded files.
	 * @function filename
	 * @param {Object} req - Express request object, containing details about the incoming HTTP request. Not used in this case.
	 * @param {Object} file - File information (including original name and mimetype).
	 * @param {Function} cb - Callback function that takes two arguments: an error or null for no errors and the filename.
	 */
	filename: (req, file, cb) => {
		// Set files to be saved with a timestamp plus their original name
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

/**
 * Multer middleware instance for handling file uploads.
 * Uses the configured storage settings and exports as default export of this module.
 */
const upload = multer({ storage });

export default upload;
