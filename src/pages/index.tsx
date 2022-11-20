/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import getDays from "src/days/queries/getDays"
import { gSSP } from "src/blitz-server"
import ipLookup from 'request-ip';
import moment from 'moment-timezone';
import Snowfall from "react-snowfall"

const Days = ({ days }) => {
  return (
    <ul>
      {days.map(day => (<li key={day.id}>{day.coffee}</li>))}
    </ul>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

export const getServerSideProps = gSSP<any, any, { days: Day[] | [], ready: boolean }>(async ({ req, params, ctx }) => {
  const ip = process.env.FAKE_IP || ipLookup.getClientIp(req);
  const tz = 'America/Los_Angeles';//ip && geoip.lookup(ip)?.timezone || 'America/Los_Angeles';

  const start = moment.tz(process.env.BEGIN_DATE, tz);
  const today = process.env.FAKE_TODAY ? moment.tz(process.env.FAKE_TODAY, tz) : moment.tz(tz);
  const ready = today.isSameOrAfter(start);

  if (!ready) {
    return {
      props: {
        days: [],
        ready: false
      }
    }
  }

  const { days } = await getDays({
    where: {
      AND: [
        { date: { gte: start.toDate() } },
        { date: { lte: today.toDate() } }
      ],
    }
  }, ctx);

  return {
    props: {
      days,
      ready
    }
  }
})

const ComingSoon = () => {
  return (
    <div id="loader-wrap">
      {typeof window !== 'undefined' ? <Snowfall /> : null}
      <div className="loader ready">
        <img className="mono-loader" width="100px" src="/images/border-monogram-white.svg" />
        <img className="r" width="50px" src="/images/r.svg" />
        <p style={{ marginTop: 10, marginBottom: 5 }}>ADVENT 2022</p>
        <p style={{ opacity: 0.5 }}>BEGINS 2022/12/01</p>
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

const Home: BlitzPage = ({ days, ready }: { days: Day[], ready: boolean }) => {
  if (!ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver">
      <main>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
        <Days days={days} />
      </main>

      <footer>
      </footer>
    </Layout>
  )
}

export default Home
