import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 15rem auto;
`;

export const Content = styled.div`
  margin: 1.5rem 0;

  background-color: var(--header-background);
  margin: 0.5rem 0;
  border-radius: 1rem;
  padding: 1rem;
  border: 2px solid rgba(150, 150, 150, 0.2);
  color: #ffffff;
  min-height: 25rem;

  display: flex;
  flex-direction: column;

  h1 {
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      input {
        flex: 1;
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
  }
`;
