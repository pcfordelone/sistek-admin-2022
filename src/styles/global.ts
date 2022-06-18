import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {        
        --green: #a5cd39;
        --red: #ff0000;
        --grey: #c8c8c8;
        --dark-grey: #333;

        --text-green: #a5cd39;
        --text-grey: #c8c8c8;
        --text-alt: #b2b2b2;
        --text-body: #969cb3;

        --header-background: #161414;
        --background: #1e1e1d;
        --shape: #353333;

        --toastify-toast-width: 550;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;        
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        
        @media (max-width: 720px) {
            font-size: 87.5%;
        }        
    }    

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    input:focus, textarea:focus {
        outline: none;
        box-shadow: 0px 0px 14px 1px rgba(165,205,57,0.66);
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    a {
        text-decoration: none;        
    }

    button {
        cursor: pointer;
        border: none;
    }

    .outlined {
        border: 2px solid var(--green);
    }

    [disabeld] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.8);
        }
    }

    .hidden {
        display: none;
    }
`;

export const Container = styled.div`
  max-width: 1120px;
  margin: 15rem auto;
`;

export const Load = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
