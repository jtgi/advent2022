import { Routes, useParam } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";
import AdminLayout from "src/core/layouts/AdminLayout";

import { DayForm, FORM_ERROR } from "src/days/components/DayForm";
import updateDay from "src/days/mutations/updateDay";
import getDay from "src/days/queries/getDay";

export const EditDay = () => {
  const router = useRouter();
  const dayId = useParam("dayId", "number");
  const [day, { setQueryData }] = useQuery(
    getDay,
    { id: dayId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateDayMutation] = useMutation(updateDay);

  return (
    <>
      <Head>
        <title>Edit Day {day.id}</title>
      </Head>

      <div>
        <h1>Edit Day {day.id}</h1>
        <pre>{JSON.stringify(day, null, 2)}</pre>

        <DayForm
          submitText="Update Day"
          initialValues={day}
          onSubmit={async (values) => {
            try {
              const updated = await updateDayMutation({
                id: day.id,
                ...values,
                date: values.date.toISOString(),
              });
              await setQueryData(updated);
              await router.push(Routes.ShowDayPage({ dayId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditDayPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDay />
      </Suspense>

      <p>
        <Link href={Routes.DaysPage()}>
          <a>Days</a>
        </Link>
      </p>
    </div>
  );
};

EditDayPage.authenticate = true;
EditDayPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default EditDayPage;
