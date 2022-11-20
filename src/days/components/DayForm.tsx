import { Form, FormProps } from "src/core/components/Form";
import LabeledDatePicker from "src/core/components/LabeledDatePicker";
import { LabeledTextField } from "src/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "src/core/components/Form";

export function DayForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledDatePicker name="date" label="Date" placeholder={"Choose Date..."} />
      <LabeledTextField name="coffee" label="Coffee" placeholder="El Tiberon, McFentia" />
      <LabeledTextField name="roaster" label="Roaster" placeholder="Intelligentsia" />
      <LabeledTextField name="roasterLink" label="Roaster Link" placeholder="https://..." />
      <LabeledTextField name="location" label="Location" placeholder="Boulder, Colorado" />
      <LabeledTextField name="tastingNotes" label="Tasting Notes" placeholder="blue cheese, blue berry..." />
      <LabeledTextField name="varieties" label="Varieties" placeholder="Caturra, SL28" />
    </Form>
  );
}
