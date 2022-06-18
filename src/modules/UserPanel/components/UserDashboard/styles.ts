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
  flex-direction: column;

  h1 {
    width: 100%;
    text-align: center;
    font-weight: 400;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--green);
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;

    div.aside {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 1rem;

      button {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        margin: 0 0.2rem 1rem 0.2rem;
        background: transparent;
        padding: 0.4rem 1rem;
        border: 1px solid #fff;
        border-radius: 1rem;
        color: #fff;

        transition: border 0.3s;

        &:hover {
          border: 1px solid var(--green);
        }
      }

      img {
        width: 13rem;
        height: 13rem;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid var(--green);
        padding: 0.5rem;
      }

      p {
        display: flex;
        align-items: center;
        flex-direction: column;

        strong {
          font-size: 2rem;
          color: var(--green);
        }
      }
    }

    div.userContent {
      display: flex;
      flex-direction: column;
      margin-bottom: 3rem;

      h2 {
        margin-top: 2rem;

        &:first-child {
          margin-top: 1rem;
        }
      }

      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.7rem;

        .pay-stub-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 12rem;
          height: 18rem;
          gap: 0.5rem;
          cursor: pointer;
          padding-top: 1rem;

          border: 2px solid var(--grey);
          border-radius: 8px;
          color: #fff;

          transition: border 0.8s;

          &:hover {
            border: 2px solid var(--green);
          }

          p {
            text-align: center;
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
            border: none;
            color: #000;

            transition: filter 0.3s;

            &:hover {
              filter: brightness(0.7);
            }
          }
        }

        ul {
          list-style: none;

          &:first-child {
            padding-right: 1rem;
            border-right: 1px solid var(--dark-grey);
          }

          &:last-child {
            padding-left: 0.5rem;
          }
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
      }
    }
  }
`;
