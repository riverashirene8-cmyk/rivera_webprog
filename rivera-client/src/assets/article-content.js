import react1 from "../assets/img/react1.png";
import react2 from "../assets/img/react2.png";
import react3 from "../assets/img/react3.png";
import react4 from "../assets/img/react4.png";
import react5 from "../assets/img/react5.png";

const articles = [
  {
    name: "react-props-and-styling",
    title: "Understanding React Props and Styling",
    image: react1,
    content: [
      "Props (short for properties) allow developers to pass data between React components. They make components reusable and dynamic.",

      "React supports different styling methods such as inline styles, external CSS, CSS modules, and Tailwind CSS.",

      "Using props helps organize applications into smaller reusable pieces that are easier to manage and maintain.",

      "Styling improves the visual appearance of components and creates better user experience in web applications."
    ]
  },

  {
    name: "react-functional-components",
    title: "React Functional Components",
    image: react2,
    content: [
      "Functional components are JavaScript functions that return JSX elements.",

      "They are lightweight, easy to understand, and commonly used in modern React development.",

      "Hooks like useState and useEffect allow functional components to manage state and lifecycle behavior.",

      "Functional components improve readability and simplify application structure."
    ]
  },

  {
    name: "react-component-lifecycle",
    title: "React Component Lifecycle",
    image: react3,
    content: [
      "The React component lifecycle describes the different phases of a component from creation to removal.",

      "Lifecycle methods help developers run code during mounting, updating, and unmounting phases.",

      "Modern React uses the useEffect hook to handle lifecycle functionality in functional components.",

      "Understanding lifecycle behavior is important for handling APIs, timers, and dynamic updates."
    ]
  },

  {
    name: "react-routing-basics",
    title: "React Router Basics",
    image: react4,
    content: [
      "React Router enables navigation between pages without reloading the browser.",

      "Routes are defined using BrowserRouter, Routes, and Route components.",

      "The Link component allows smooth navigation between pages inside the application.",

      "Routing helps organize large React applications into multiple pages and views."
    ]
  },

  {
    name: "react-state-management",
    title: "Managing State in React",
    image: react5,
    content: [
      "State allows React components to store and update dynamic information.",

      "The useState hook is commonly used for managing state inside functional components.",

      "Updating state automatically re-renders the component with new data.",

      "State management is essential for interactive applications such as forms, counters, and user interfaces."
    ]
  }
];

export default articles;