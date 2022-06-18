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
  display: flex;
  align-items: center;
  flex-direction: column;

  &:first-child {
    align-items: flex-start;
  }

  h1 {
    font-weight: 400;
  }

  .panels {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      border: 2px solid var(--green);
      border-radius: 8px;
      margin: 1rem 0;
      min-height: 18rem;
      padding: 2rem;
      font-size: 1.5rem;

      p {
        text-align: center;
      }
      strong {
        font-size: 3rem;
      }
    }
  }
`;
