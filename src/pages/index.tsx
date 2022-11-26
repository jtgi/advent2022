/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { BlitzPage } from "@blitzjs/next";
import moment from 'moment-timezone';
import Image from 'next/image';
import { Suspense, useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import { gSSP } from "src/blitz-server";
import { ComingSoon } from "src/core/components/ComingSoon";
import Layout from "src/core/layouts/Layout";
import getDays from "src/days/queries/getDays";
import { useCurrentUser } from "src/users/hooks/useCurrentUser";
import { EffectCoverflow, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';


const Days = ({ days }) => {
  const height = useInnerHeight();

  return (
    <div style={{ height }}>
      <Swiper
        className="p-12 m-auto w-full h-full"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        centerInsufficientSlides={true}
        slidesPerView={'auto'}
        spaceBetween={30}
        keyboard={{ enabled: true }}
        centeredSlidesBounds={true}
        coverflowEffect={{
          slideShadows: false,
          rotate: 20,
          stretch: 10,
          depth: 200,
          modifier: 1,
        }}
        pagination={false}
        modules={[EffectCoverflow, Keyboard]}
      >
        {days.map((day) => {
          const date = new Date(day.date).getDate();
          return (
            <SwiperSlide key={day.id} className="text-white ">
              <div className="md:max-w-[600px] md:max-h-[600px] max-h-[500px] min-w-[300px] w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 m-auto overflow-hidden shadow-2xl p-10 rounded-3xl bg-gradient-to-r to-[#0e1534] from-[#010229] ">
                <div className="absolute w-full h-full">
                  <Image className="opacity-10" src={`/images/numbers/highlighted/${date}.svg`} layout={"fill"} />
                </div>
                <div className="flex flex-col justify-end h-full w-full">
                  <div>
                    <h1 className="text-3xl md:text-6xl font-black">{day.coffee}</h1>
                    <h2 className="text-lg md:text-2xl"><a target="_blank" href={day.roasterLink} rel="noreferrer">{day.roaster}</a></h2>
                    <h2 className="text-lg md:text-2xl opacity-30">{day.location}</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export const getServerSideProps = gSSP<any, any, any>(async ({ req, ctx }) => {
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
    },
    skip: undefined,
    orderBy: undefined,
    take: undefined
  }, ctx);

  return {
    props: {
      days,
      ready
    }
  }
})

const Home: BlitzPage = (props: ReturnType<typeof getServerSideProps>) => {
  const { ready, days } = props as any;
  const user = useCurrentUser();
  if (!ready && !user) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver" >
      <Suspense>
        <Snowfall />
        <Days days={days} />

      <footer>
      </footer>
      </Suspense>
    </Layout>
  )
}

function useInnerHeight() {
  const [height, setHeight] = useState("100%");

  useEffect(() => {
    const documentHeight = () => {
      setHeight(window.innerHeight + 'px');
    }
    documentHeight();
    window.addEventListener('resize', documentHeight);
    return () => window.removeEventListener('resize', documentHeight);
  }, [])

  return height;
}


export default Home
