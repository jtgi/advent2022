import { BlitzPage } from "@blitzjs/next";
import Snowfall from "react-snowfall";
import { Calendar } from "src/core/components/Calendar";
import { ComingSoon } from "src/core/components/ComingSoon";
import Layout from "src/core/layouts/Layout";
import { fetchCalendarSSR } from "src/core/utils/calendar";

export const getServerSideProps = fetchCalendarSSR;

const Day: BlitzPage = (props: any) => {
  const { ready, days, targetDay } = props as any;

  if (!ready) {
    return <ComingSoon />
  }

  return (
    <Layout title="Advent 2022 by Revolver" >
      <Snowfall />
      <Calendar days={days} targetDay={targetDay - 1} />
    </Layout>
  )
}



export default Day
