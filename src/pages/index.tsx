import { BlitzPage } from "@blitzjs/next";
import Snowfall from "react-snowfall";
import { ComingSoon } from "src/core/components/ComingSoon";
import Layout from "src/core/layouts/Layout";
import { fetchCalendarSSR } from "src/core/utils/calendar";

/* eslint-disable jsx-a11y/alt-text */
import { Calendar } from "src/core/components/Calendar";


export const getServerSideProps = fetchCalendarSSR;

const Home: BlitzPage = (props: any) => {
  const { ready, days, targetDay } = props as any;

  if (!ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver" >
      <Snowfall />
      <Calendar days={days} targetDay={targetDay} />
    </Layout>
  )
}

export default Home
