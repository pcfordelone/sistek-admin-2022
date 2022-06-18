import styled from "styled-components";

export const Container = styled.header`
  background: var(--header-background);
  border-bottom: 4px solid var(--green);

  position: fixed;
  top: 0;
  width: 100%;
  padding: 0;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  height: 13rem;

  padding: 2rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  img {
    max-height: 10rem;
  }

  .headerColumn {
    display: flex;
    flex-direction: column;

    .serviceImg {
      height: 5rem;
    }

    &:last-child {
      margin: 1.5rem 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      button {
        background: var(--green);
        border: none;
        padding: 0.6rem 3rem;
        border-radius: 0.5rem;
        margin-left: 1rem;
        font-size: 1.2rem;
        font-weight: 600;

        transition: filter 0.3s;

        &:hover {
          filter: brightness(0.7);
        }

        &:disabled {
          filter: brightness(0.7);
          cursor: none;
        }
      }

      .outlined {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        font-size: 1rem;
        font-weight: 400;
        padding: 0.1rem 1rem;
        height: 3rem;
        background: transparent;
        border: 2px solid var(--green);
        color: #fff;

        img {
          height: 1.7rem;
          margin-top: 0.3rem;
        }
      }
    }
  }
`;
