import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 15rem auto;
`;

export const Content = styled.div`
  background-color: var(--header-background);
  border-radius: 1rem;
  padding: 1rem;
  border: 2px solid rgba(150, 150, 150, 0.2);
  color: #ffffff;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 0.5rem;

      input {
        padding: 1rem;
        border-radius: 8px;
        border: 2px solid var(--green);
        color: var(--gray-500);
        margin: 0.2rem;
        font-size: 1rem;
        background: transparent;
        color: #ffffff;

        &::placeholder {
          color: var(--text-grey);
        }
      }

      input[type="file"]::content {
        border-radius: 8rem;
        background: transparent;
      }

      &:first-child {
        input {
          &:first-child {
            min-width: 30%;
          }

          &:last-child {
            flex: 1;
          }
        }
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      margin: 1rem 0;
      padding: 0.8rem;
      font-size: 1rem;
      background: var(--green);
      border-radius: 8px;
    }

    div.cep {
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.address {
      input {
        &:first-child {
          flex: 3;
        }
      }
    }
  }
`;
