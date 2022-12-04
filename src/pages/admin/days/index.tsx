import { Routes } from "@blitzjs/next";
import { usePaginatedQuery } from "@blitzjs/rpc";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";
import AdminLayout from "src/core/layouts/AdminLayout";
import getDays from "src/days/queries/getDays";

const ITEMS_PER_PAGE = 100;
const DaysList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ days, hasMore }] = usePaginatedQuery(getDays, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul className="list-none p-0">
        {days.map((day) => (
          <li className="mb-1" key={day.id}>
            <Link href={Routes.ShowDayPage({ dayId: day.id })}>
              <a className="text-blue-500 hover:underline">Day {day.date.toISOString()} – {day.coffee}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button className="inline-block mr-1" disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button className="inline-block mr-1" disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};
const DaysPage = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Days</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewDayPage()}>
            <a>Create Day</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DaysList />
        </Suspense>
      </div>
    </AdminLayout>
  );
};

DaysPage.authenticate = true;

export default DaysPage;
