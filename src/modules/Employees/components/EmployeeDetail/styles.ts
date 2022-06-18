import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 15rem auto;

  .hidden {
    display: none;
  }

  nav {
    display: flex;
    gap: 0.5rem;

    button {
      margin: 0 0.2rem;
      background: transparent;
      padding: 0.4rem 1rem;
      border: 1px solid #fff;
      border-radius: 1rem;
      color: #fff;
    }

    .active {
      border: 1px solid var(--green);
    }
  }
`;

export const Content = styled.div`
  margin: 1.5rem 0;

  background-color: var(--header-background);
  margin: 0.5rem 0;
  border-radius: 1rem;
  padding: 1rem;
  border: 2px solid rgba(150, 150, 150, 0.2);

  display: grid;
  grid-template-columns: 1fr 3fr 2fr; // repete 3x colunas, fr -> flexível
  gap: 2rem;

  .avatar {
    border-radius: 50%;
    border: 4px solid var(--green);
    width: 13rem;
    height: 13rem;
    object-fit: cover;
    padding: 0.5rem;
  }
  .avatarNoImg {
    width: 13rem;
    height: 13rem;
  }

  .contentItem {
    padding-bottom: 2rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    h2 {
      font-weight: 400;
      line-height: 1.5rem;

      small {
        color: var(--green);
        font-size: 1rem;
      }
    }

    p {
      margin: 2rem 0;
      color: var(--text-grey);
    }

    ul {
      list-style: none;
    }

    li {
      font-size: 1.3rem;
      color: var(--text-grey);
      line-height: 1.8rem;

      span {
        font-size: 1rem;
        color: #fff;
      }
    }

    &:last-child {
      align-items: flex-end;
      justify-content: flex-start;

      p {
        margin: 0 0 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &:last-child {
          margin-top: 1rem;
        }
      }

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

export const PayStubContainer = styled.div`
  margin: 1.5rem 0;
  background-color: var(--header-background);
  margin: 0.5rem 0;
  border-radius: 1rem;
  padding: 2rem;
  border: 2px solid rgba(150, 150, 150, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #fff;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    .pay-stub-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 12rem;
      height: 12rem;
      margin: 0 0.5rem;
      gap: 0.5rem;
      cursor: pointer;

      border: 2px solid var(--grey);
      border-radius: 8px;
      color: #fff;

      transition: border 0.8s;

      &:hover {
        border: 2px solid var(--green);
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        margin: 1rem 0;
        padding: 0.4rem;
        font-size: 0.8rem;
        background: var(--green);
        border-radius: 8px;

        transition: filter 0.3s;

        &:hover {
          filter: brightness(0.7);
        }
      }

      .deleteBtn {
        position: absolute;
        top: -5px;
        right: 10px;
        padding: 0.4rem;
        font-size: 0.8rem;
        background: transparent;
        border-radius: 8px;
        border: 1px solid var(--grey);
        filter: brightness(0.5);

        transition: filter 0.3s;

        &:hover {
          filter: brightness(1);
        }
      }
    }
  }
`;
