
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Snowfall from "react-snowfall"

export const ComingSoon = () => {
  return (
    <div id="loader-wrap">
      {typeof window !== 'undefined' ? <Snowfall /> : null}
      <div className="loader ready">
        <img className="mono-loader" width="100px" src="/images/border-monogram-white.svg" />
        <img className="r" width="50px" src="/images/r.svg" />
        <p style={{ marginTop: 10, marginBottom: 5 }}>ADVENT 2022</p>
        <p style={{ opacity: 0.5 }}>BEGINNING 12/01</p>
      </div>
      <style jsx>{`
  #loader-wrap {
    font-family: 'Roboto', sans-serif;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: black;

      background: linear-gradient(-45deg, #091132,  #0e1534, #140f0e);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      height: 100vh;

  }
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

  #loader-wrap .loader {
    margin: auto;
    position: absolute;
    text-align: center;
    width: 200px;
    height: 200px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .loader p {
    color: #e4e4e4;
    font-size: 0.7rem;
    margin-top: 0;
    opacity: 0.8;
  }

  #loader-wrap .loader .mono-loader {
    animation: circle 20s linear infinite;
    width: 125px;
    height: 125px;
    color: white;
    margin: 0 auto;
  }

  #loader-wrap .loader .r {
    position: absolute;
    top: 28px;
    left: 67px;
    width: 70px;
    height: 70px;
    color: white;
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  `}</style>
    </div>
  )
}
