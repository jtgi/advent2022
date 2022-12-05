import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminLayout from "src/core/layouts/AdminLayout";
import { DayForm, FORM_ERROR } from "src/days/components/DayForm";
import createDay from "src/days/mutations/createDay";

const NewDayPage = () => {
  const router = useRouter();
  const [createDayMutation] = useMutation(createDay);

  return (
    <AdminLayout title={"Create New Day"}>
      <h1>Create New Day</h1>

      <DayForm
        submitText="Create Day"
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const day = await createDayMutation({
              ...values,
              date: values.date.toISOString(),
            });
            await router.push(Routes.ShowDayPage({ dayId: day.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.DaysPage()}>
          <a>Days</a>
        </Link>
      </p>
    </AdminLayout>
  );
};

NewDayPage.authenticate = true;

export default NewDayPage;
