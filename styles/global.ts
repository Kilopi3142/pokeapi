import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 18px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 30px;
  }

  li {
    margin: 6px;
  }
  a {
    text-decoration: none;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {

    background-color: #0056b3;
  }


  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }


  input {

    padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  }


  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .card {
    background-color: #e1e1ea;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
    width: 80%;
    max-width: 600px;
  }




  
`;

export default GlobalStyle;
