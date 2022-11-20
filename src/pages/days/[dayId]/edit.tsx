import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getDay from "src/days/queries/getDay";
import updateDay from "src/days/mutations/updateDay";
import { DayForm, FORM_ERROR } from "src/days/components/DayForm";
import { CreateDay, UpdateDay } from "../../../days/validations";

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
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={CreateDay}
          initialValues={day}
          onSubmit={async (values) => {
            try {
              const updated = await updateDayMutation({
                id: day.id,
                ...values,
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
EditDayPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditDayPage;
