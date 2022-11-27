import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import { DayForm, FORM_ERROR } from "src/days/components/DayForm";
import createDay from "src/days/mutations/createDay";
import { CreateDay } from "../../../days/validations";

const NewDayPage = () => {
  const router = useRouter();
  const [createDayMutation] = useMutation(createDay);

  return (
    <Layout title={"Create New Day"}>
      <h1>Create New Day</h1>

      <DayForm
        submitText="Create Day"
        schema={CreateDay}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const day = await createDayMutation(values);
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
    </Layout>
  );
};

NewDayPage.authenticate = true;

export default NewDayPage;
