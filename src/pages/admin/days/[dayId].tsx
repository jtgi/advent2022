import { Routes, useParam } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

import Layout from "src/core/layouts/Layout";
import deleteDay from "src/days/mutations/deleteDay";
import getDay from "src/days/queries/getDay";

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

      <div className="space-y-4">
        <h1 className="text-lg">Day {day.id}</h1>
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
    <div className="space-y-5">
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
