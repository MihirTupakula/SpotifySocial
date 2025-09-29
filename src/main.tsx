import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('main.tsx loading...');

try {
  const rootElement = document.getElementById("root");
  console.log('Root element found:', rootElement);
  
  if (rootElement) {
    const root = createRoot(rootElement);
    console.log('Creating root...');
    root.render(<App />);
    console.log('App rendered successfully');
  } else {
    console.error('Root element not found!');
  }
} catch (error) {
  console.error('Error in main.tsx:', error);
}
