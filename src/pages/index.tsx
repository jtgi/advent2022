/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import { BlitzPage } from "@blitzjs/next";
import Snowfall from "react-snowfall";
import { ComingSoon } from "src/core/components/ComingSoon";
import Layout from "src/core/layouts/Layout";
import { fetchCalendarSSR } from "src/core/utils/calendar";

import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

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
                  <Image className="opacity-10" src={`/images/numbers/highlighted/${index + 1}.svg`} layout={"fill"} />
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

/* eslint-disable jsx-a11y/alt-text */
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon } from "@heroicons/react/20/solid";
import { clx } from "src/core/utils/common";
import { useInnerHeight } from "src/core/utils/hooks";
export const getServerSideProps = fetchCalendarSSR;

const Home: BlitzPage = (props: any) => {
  const { ready, days, targetDay } = props as any;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = !!window.localStorage.getItem("showWelcome")
    if (!seen) {
      window.localStorage.setItem("showWelcome", "true");
      setShow(true)
    }
  }, [])


  if (!ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver" >

      {show ? (
        <>
          <Snowfall snowflakeCount={20} />
          <Welcome onClose={() => {
            setShow(false);
            localStorage.setItem("showWelcome", "true");
          }} />
        </>
      ) : (
        <>
            <Snowfall snowflakeCount={60} />
      <div className="relative w-full">
              <Calendar days={days} targetDay={targetDay} />
      </div>

        </>
      )}
    </Layout>
  )
}


function Welcome({ onClose }: { onClose?: () => void }) {
  return (
    <div className="z-40 relative opacity-90 md:max-w-[600px] min-w-[300px] w-full h-full mx-auto mt-10 mb-40 p-10 rounded-3xl space-y-6">
      <div><Image className="block my-6 invert opacity-60" src="/images/monogram.svg" width={80} height={80} /></div>

      <div className="prose prose-sm text-slate-400">
        <p>Welcome. As you'll notice, each box inside is marked with only a number. The daily reveal happens here everyday — you can either scan the QR code in your calendar or just bookmark this page.</p>

        <p>May we suggest making a game out of it and looking what the coffee is after you've tried it and thought about it?</p>

        <p>The coffees in this box are from a collection of roasters from around the globe, spanning 23 cities and 13 different countries. The coffees themselves have various taste profiles and processing methods, some of which are ‘tried and true', and others that are out there and experimental. We purposely tried to give a wide range of what's going on in the specialty coffee world right now.</p>

        <p>When you open each day's coffee, take note of the bean size, the colour of them, and the smell when you grind them. And of course, the taste in the cup. We included a tasting journal to record your thoughts, or to do lists, or whatever you want.</p>

        <p>We'll be brewing with the following in mind:</p>
        <ul>
          <li>20g Coffee (that's the entire ziplock bag), with 320g of water. 1g of Water = 1ml, if you don't have a weigh scale.</li>
          <li>If you find after a few days that this is too weak for you, do a little less water. 305g would be a good start. If it's too strong, do a little more (340g).</li>
        </ul>

        <p>Enjoy your Calendar. Enjoy your December. And enjoy this year's Advent Season.</p>

        <p>For any questions, you can email us, or reach out on Instagram, our website (there's a chat button and a contact form), or ask in person if you're at the shop if you're in town.</p>
      </div>

      <div className="mb-10 h-20"><button onClick={onClose} className="py-2 px-4 text-white border mb-10 hover:border-slate-500 border-slate-700 block w-40 rounded-md">Begin <ArrowRightIcon className="inline w-4 h-4" /></button></div>
    </div>
  );
}
function Footer() {
  return (
    <div className="opacity-90 hover:opacity-100 flex items-center bg-[#42448c] p-3 rounded-xl">
      <a
        type="button"
        className="relative inline-flex items-center text-slate-300 opacity-50 hover:opacity-100 text-sm font-medium "
      >
        Brewing Guide
      </a>

    </div>
  )
}

export default Home
