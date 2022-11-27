/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { BlitzPage } from "@blitzjs/next";

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import moment from 'moment-timezone';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import Snowfall from "react-snowfall";
import { gSSP } from "src/blitz-server";
import { ComingSoon } from "src/core/components/ComingSoon";
import Layout from "src/core/layouts/Layout";
import getDays from "src/days/queries/getDays";
import { EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

const clx = (...args: string[]) => {
  return args.filter(Boolean).join(' ')
}

const Days = ({ days, targetDay }) => {
  const height = useInnerHeight();
  const ref = useRef<any>()
  const [showNav, setShowNav] = useState({ left: false, right: days.length > 1 })

  function onSlideChange() {
    const swiper = ref.current.swiper;
    const { activeIndex, isBeginning, isEnd } = swiper;
    setShowNav({ left: !isBeginning, right: !isEnd })
  }

  return (
    <div style={{ height }}>
      <div className={clx("absolute right-10 top-1/2 -translate-y-1/2 text-3xl z-10 text-white rounded-full bg-slate-800 w-10 h-10 text-center flex justify-center items-center cursor-pointer hover:bg-slate-700 invisible", showNav.right ? 'md:visible' : 'invisible')} onClick={() => {
        ref.current.swiper.slideNext();
      }}><ArrowRightIcon className="w-5 h-5 text-blue-200" /></div>
      <div className={clx("absolute left-10 top-1/2 -translate-y-1/2 text-3xl z-10 text-white rounded-full bg-slate-800 w-10 h-10 text-center flex justify-center items-center cursor-pointer hover:bg-slate-700 invisible", showNav.left ? 'md:visible' : 'invisible')} onClick={() => {
        ref.current.swiper.slidePrev();
      }}><ArrowLeftIcon className="w-5 h-5 text-blue-200" /></div>
      <Swiper
        ref={ref}
        initialSlide={targetDay}
        className="p-12 m-auto w-full h-full"
        effect="coverflow"
        pagination={{ type: 'progressbar' }}
        grabCursor={true}
        centeredSlides={true}
        onSlideChange={onSlideChange}
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
        modules={[EffectCoverflow, Keyboard, Pagination, Navigation]}
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

async function fetchTimezone(ip: string) {
  return fetch(`https://geoip-pi.vercel.app/api/${ip}`)
    .then((res) => res.json())
    .then((data) => {
      return data.timezone
    })
    .catch((err) => {
      return undefined;
    });
}

export const getServerSideProps = gSSP<any, any, any>(async ({ req, ctx }) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
  const tz = ip && await fetchTimezone(process.env.FAKE_IP || ip) || 'America/Los_Angeles';

  const start = moment.tz(process.env.BEGIN_DATE, tz);
  const today = process.env.FAKE_TODAY ? moment.tz(process.env.FAKE_TODAY, tz) : moment.tz(tz);
  const ready = today.isSameOrAfter(start, 'day');

  if (!ready) {
    return {
      props: {
        days: [],
        ready: false,
        targetDay: -1
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
      ready,
      targetDay: today.date()
    }
  }
})

const Home: BlitzPage = (props: ReturnType<typeof getServerSideProps>) => {
  const { ready, days, targetDay } = props as any;
  if (!ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver" >

      <Snowfall />
      <Days days={days} targetDay={targetDay - 1} />

      <footer>
      </footer>
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
