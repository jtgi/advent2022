import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getDay from "src/days/queries/getDay";
import deleteDay from "src/days/mutations/deleteDay";

export const Day = () => {
  const router = useRouter();
  const dayId = useParam("dayId", "number");
  const [deleteDayMutation] = useMutation(deleteDay);
  const [day] = useQuery(getDay, { id: dayId });

  return (
    <>
      <Head>
        <title>Day {day.id}</title>
      </Head>

      <div>
        <h1>Day {day.id}</h1>
        <pre>{JSON.stringify(day, null, 2)}</pre>

        <Link href={Routes.EditDayPage({ dayId: day.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteDayMutation({ id: day.id });
              await router.push(Routes.DaysPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowDayPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.DaysPage()}>
          <a>Days</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Day />
      </Suspense>
    </div>
  );
};

ShowDayPage.authenticate = true;
ShowDayPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowDayPage;
