import { BlitzPage } from "@blitzjs/next";
import Snowfall from "react-snowfall";
import { ComingSoon } from "src/core/components/ComingSoon";
import Layout from "src/core/layouts/Layout";
import { fetchCalendarSSR } from "src/core/utils/calendar";

import { ArrowLeftIcon, ArrowRightIcon, LinkIcon } from "@heroicons/react/20/solid";
import Image from 'next/image';
import { useRef, useState } from "react";
import { clx } from "src/core/utils/common";
import { useInnerHeight } from "src/core/utils/hooks";
import { EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

export const getServerSideProps = fetchCalendarSSR;

const Calendar = ({ days, targetDay }) => {
  const ref = useRef<any>()
  const [showNav, setShowNav] = useState({ left: false, right: days.length > 1 })

  const height = useInnerHeight();

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
        {days.map((day, index) => {
          return (
            <SwiperSlide key={day.id} className="text-white ">
              <div className="md:max-w-[600px] md:max-h-[600px] max-h-[500px] min-w-[300px] w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 m-auto overflow-hidden shadow-2xl p-10 rounded-3xl bg-gradient-to-r to-[#0e1534] from-[#010229] ">
                <div className="absolute w-full h-full">
                  <Image alt="10" className="opacity-10" src={`/images/numbers/highlighted/${index + 1}.svg`} layout={"fill"} />
                </div>

                <div className="flex flex-col justify-end h-full w-full space-y-3">
                  <div>
                    <h1 className="text-3xl md:text-6xl font-black">{day.coffee}</h1>
                    <h2 className="text-lg md:text-2xl"><a target="_blank" href={day.roasterLink} className="opacity-90" rel="noreferrer">{day.roaster}, <span className="opacity-70">{day.location}</span></a></h2>
                  </div>

                  <dl className="divide-y divide-gray-800">
                    <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-2">
                      <dt className="text-sm font-medium text-gray-700">Roaster Tasting Notes</dt>
                      <dd className="mt-1 flex text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">{day.tastingNotes}</span>
                      </dd>
                    </div>

                    <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-2">
                      <dt className="text-sm font-medium text-gray-700">Variety</dt>
                      <dd className="mt-1 flex text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">{day.varieties}</span>
                      </dd>
                    </div>

                    {(day.roasterLink || day.coffeeLink || day.videoLink) && <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-2">
                      <dt className="text-sm font-medium text-gray-700">More Info</dt>
                      <dd className="mt-1 flex text-sm text-gray-500 sm:col-span-2 sm:mt-0 space-x-5">
                        {day.roasterLink && <a target="_blank" className="block" href={day.roasterLink} rel="noreferrer">Roaster <LinkIcon className="inline w-3 h-3" /></a>}
                        {day.coffeeLink && <a target="_blank" className="block" href={day.coffeeLink} rel="noreferrer">Coffee <LinkIcon className="inline w-3 h-3" /></a>}
                        {day.videoLink && <a target="_blank" className="block" href={day.videoLink} rel="noreferrer">Video <LinkIcon className="inline w-3 h-3" /></a>}
                      </dd>
                    </div>}
                  </dl>

                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const Day: BlitzPage = (props: any) => {
  const { ready, days, targetDay } = props as any;

  if (!ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver" >
      <Snowfall snowflakeCount={60} />
      <Calendar days={days} targetDay={targetDay - 1} />
    </Layout>
  )
}



export default Day
