import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;

  background: url("/src/assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  img {
    max-height: 13rem;
  }

  p {
    color: var(--text-grey);
    font-size: 1.3rem;
  }

  .alert {
    background: rgba(255, 100, 80, 0.4);
    color: var(--text-grey);
    font-size: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 35%;
    gap: 0.5rem;

    input {
      width: 100%;
      padding: 1rem;
      border-radius: 0.8rem;
      text-align: center;
      border: none;
      outline: none;
      font-size: 1rem;

      &:focus {
        outline: 2px solid var(--green);
      }

      &::placeholder {
        font-size: 1rem;
      }
    }

    div {
      margin: 1.5rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      button {
        width: 100%;
        padding: 1rem;
        border-radius: 0.8rem;
        font-size: 1.1rem;
        background: #000;
        color: var(--text-grey);
        font-weight: 600;

        &:last-child {
          background: var(--green);
          color: #000;
        }
      }
    }
  }

  .serviceImg {
    width: 50%;
  }
`;
