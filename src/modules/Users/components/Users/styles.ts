import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 15rem auto;
`;

export const Content = styled.div`
  background-color: var(--header-background);
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid rgba(150, 150, 150, 0.2);
  color: #fff;

  nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    button {
      margin: 0 0.2rem;
      background: transparent;
      padding: 0.4rem 1rem;
      border: 1px solid #fff;
      border-radius: 1rem;
      color: var(--grey);

      transition: border 0.3s;

      &:hover {
        border: 1px solid var(--green);
      }

      &:disabled {
        cursor: auto;
        filter: brightness(0.5);

        &:hover {
          border: 1px solid #fff;
        }
      }
    }
  }

  .title {
    padding: 1.3rem;
  }

  div {
    background: var(--header-background);
    padding: 1rem;
    border: 1px solid rgba(150, 150, 150, 0.2);
    color: var(--grey);

    ul {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;

      li {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        gap: 0.3rem;
        padding: 0 0.5rem;
        margin: 0;

        &:first-child {
          flex: 0;
        }

        &:last-child {
          justify-content: flex-end;
        }

        button {
          background: transparent;

          transition: filter 0.3s;

          &:hover {
            filter: brightness(0.7);
          }

          &:disabled {
            filter: brightness(0.7);
            cursor: default;
          }
        }
      }
    }
  }
`;
