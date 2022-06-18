import styled from "styled-components";

export const EmployeeItem = styled.div`
  background-color: var(--header-background);
  margin: 0.5rem 0;
  border-radius: 1rem;
  padding: 1rem;
  border: 2px solid rgba(150, 150, 150, 0.2);

  display: grid;
  grid-template-columns: 1fr 3fr 3fr; // repete 3x colunas, fr -> flexível
  gap: 2rem;

  .avatar {
    height: 9rem;
    width: 9rem;
    border-radius: 50%;
    border: 4px solid var(--green);
    object-fit: cover;
    padding: 0.4rem;
  }

  .contentItem {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    p {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    h2 {
      font-weight: 400;
      line-height: 1.5rem;

      small {
        color: var(--green);
        font-size: 1rem;
      }
    }

    &:last-child {
      align-items: flex-end;

      button {
        margin: 0 0.2rem;
        background: transparent;
        padding: 0.4rem 1rem;
        border: 2px solid var(--green);
        border-radius: 1rem;

        img {
          height: 2rem;
        }

        transition: filter 0.3s;

        &:hover {
          filter: brightness(0.7);
        }
      }
    }
  }
`;
