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
import { ComingSoon } from "src/core/components/ComingSoon"
import { Swiper, SwiperSlide } from 'swiper/react';

const Days = ({ days }) => {
  return (
    <div>
      days
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
      >
        {days.map(day =>
          <SwiperSlide key={day.id}>
            <div style={{ width: 100, height: 100, backgroundColor: 'orange' }}>{day.coffee}</div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
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
  //todo: vercel 50mb limit
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



const Home: BlitzPage = ({ days, ready }: { days: Day[], ready: boolean }) => {
  if (false && !ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver">
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <UserInfo />
        </Suspense>
        <Days days={days} />
      </main>

      <footer>
      </footer>
    </Layout>
  )
}

export default Home
