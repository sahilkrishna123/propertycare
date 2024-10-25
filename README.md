# PropertyCare

PropertyCare is a robust real estate management web application designed to streamline property transactions with a modern tech stack. This re-engineered version includes enhanced performance, security, and new features like Google Maps integration for geospatial property searches.

## Key Features

- **Maps Integration** for property visualization
- **JWT Authentication** for secure, stateless login
- **Vite Frontend** for faster build times
- **MongoDB Cloud** for improved scalability
- **MVC Architecture** for organized codebase
- **Role-Based Access Control** for secure user permissions
- **Email Notifications** for user engagement

## Getting Started

### Prerequisites

- **Node.js**
- **MongoDB Cloud account or Local MongoDB Setup**
- **Config File**: A `config.env` file is required for the backend. Please email [sahilkrishna1243@gmail.com](mailto:sahilkrishna1243@gmail.com) to receive it.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sahilkrishna123/propertycare.git
   cd propertycare
   ```

2. **Install Dependencies**
   - In both `front-end` and `server` directories:
     ```bash
     cd front-end
     npm install
     ```
      ```bash
     cd server
     npm install
     ```

3. **Setup Configurations**
   - Place the provided `config.env` file in the `server` directory.

4. **Run the Application**
   - **Frontend**
     ```bash
     cd front-end
     npm run dev
     ```
   - **Backend**
     ```bash
     cd server
     npm start
     ```

   Access the frontend at `http://localhost:3000` and backend at `http://localhost:5000`.

## Project Structure

- **Frontend**: Built with React and Vite for a responsive and fast user interface.
- **Backend**: Node.js with Express and MongoDB, adopting MVC architecture.
- **Security**: JWT Authentication, rate-limiting, bcrypt password hashing.
- **Image Storage**: Currently stored in a backend directory; future versions will migrate images to cloud storage.

## Contributing

Contributions are welcome! For issues, suggestions, or improvements, please open a GitHub issue or pull request.

## License

This project is available under the [MIT License](LICENSE).
