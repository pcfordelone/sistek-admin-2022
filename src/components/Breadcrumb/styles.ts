import styled from "styled-components";

export const Container = styled.div`
  margin: 1.5rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--green);

    span {
      font-size: 1rem;
      color: #fff;
    }
  }

  button {
    background: var(--green);
    padding: 1rem;
    font-size: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 700;

    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.7);
    }
  }
`;
