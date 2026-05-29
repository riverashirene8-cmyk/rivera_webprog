const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const seedArticles = async () => {
  const Article = require("../models/Article");

  try {
    const count = await Article.estimatedDocumentCount();

    if (count > 0) {
      console.log("Database already has articles, skipping article seed");
      return;
    }

    console.log("Seeding default articles...");

    const articles = [
      {
        name: "react-props-and-styling",
        title: "Understanding React Props and Styling",
        image: "/img/react1.png",
        content: [
          "Props (short for properties) allow developers to pass data between React components. They make components reusable and dynamic.",
          "React supports different styling methods such as inline styles, external CSS, CSS modules, and Tailwind CSS.",
          "Using props helps organize applications into smaller reusable pieces that are easier to manage and maintain.",
          "Styling improves the visual appearance of components and creates better user experience in web applications.",
        ],
      },
      {
        name: "react-functional-components",
        title: "React Functional Components",
        image: "/img/react2.png",
        content: [
          "Functional components are JavaScript functions that return JSX elements.",
          "They are lightweight, easy to understand, and commonly used in modern React development.",
          "Hooks like useState and useEffect allow functional components to manage state and lifecycle behavior.",
          "Functional components improve readability and simplify application structure.",
        ],
      },
      {
        name: "react-component-lifecycle",
        title: "React Component Lifecycle",
        image: "/img/react3.png",
        content: [
          "The React component lifecycle describes the different phases of a component from creation to removal.",
          "Lifecycle methods help developers run code during mounting, updating, and unmounting phases.",
          "Modern React uses the useEffect hook to handle lifecycle functionality in functional components.",
          "Understanding lifecycle behavior is important for handling APIs, timers, and dynamic updates.",
        ],
      },
      {
        name: "react-routing-basics",
        title: "React Router Basics",
        image: "/img/react4.png",
        content: [
          "React Router enables navigation between pages without reloading the browser.",
          "Routes are defined using BrowserRouter, Routes, and Route components.",
          "The Link component allows smooth navigation between pages inside the application.",
          "Routing helps organize large React applications into multiple pages and views.",
        ],
      },
      {
        name: "react-state-management",
        title: "Managing State in React",
        image: "/img/react5.png",
        content: [
          "State allows React components to store and update dynamic information.",
          "The useState hook is commonly used for managing state inside functional components.",
          "Updating state automatically re-renders the component with new data.",
          "State management is essential for interactive applications such as forms, counters, and user interfaces.",
        ],
      },
    ];

    await Article.create(articles);
    console.log("Seeded default articles");
  } catch (error) {
    console.error("Error seeding articles:", error);
  }
};

const seedUsers = async () => {
  const User = require("../models/User");

  try {
    const count = await User.estimatedDocumentCount();
    console.log(`Found ${count} existing users`);
    
    if (count > 0) {
      console.log("Database already has users, skipping seed");
      return;
    }

    console.log("Seeding default users...");
    const users = [
      {
        firstName: "Admin",
        lastName: "Rivera",
        age: "30",
        gender: "female",
        contactNumber: "09171234567",
        email: "admin@rivera.dev",
        type: "admin",
        username: "adminrivera",
        password: "Admin123!",
        address: "Manila, Philippines",
        isActive: true,
      },
      {
        firstName: "Editor",
        lastName: "Santos",
        age: "28",
        gender: "male",
        contactNumber: "09182345678",
        email: "editor@rivera.dev",
        type: "editor",
        username: "editorrivera",
        password: "Editor123!",
        address: "Makati, Philippines",
        isActive: true,
      },
      {
        firstName: "Viewer",
        lastName: "Garcia",
        age: "25",
        gender: "female",
        contactNumber: "09193456789",
        email: "viewer@rivera.dev",
        type: "viewer",
        username: "viewerivera",
        password: "Viewer123!",
        address: "Quezon City, Philippines",
        isActive: true,
      },
    ];

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.create(hashedUsers);
    console.log("Seeded default users: admin, editor, viewer");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

const connectDB = async () => {
  try {
    const atlasUri = process.env.MONGO_URI;
    
    if (atlasUri) {
      try {
        console.log("Attempting to connect to MongoDB Atlas...");
        await mongoose.connect(atlasUri, { 
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 10000,
        });
        console.log("✓ MongoDB Connected (Atlas)");
        await seedUsers();
        await seedArticles();
        return;
      } catch (atlasError) {
        console.log("✗ Atlas connection failed:", atlasError.message);
        console.log("Falling back to local MongoDB...");
      }
    }

    // Fallback to local MongoDB
    const localUri = "mongodb://localhost:27017/rivera";
    console.log("Attempting to connect to local MongoDB...");
    await mongoose.connect(localUri, { 
      serverSelectionTimeoutMS: 5000
    });
    console.log("✓ MongoDB Connected (Local)");
    await seedUsers();
    await seedArticles();
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    console.log("\n⚠️  Troubleshooting:");
    console.log("1. For Atlas: Check IP whitelist (Network Access) and internet connection");
    console.log("2. For Local: Start MongoDB with: mongod");
    process.exit(1);
  }
};

module.exports = connectDB;