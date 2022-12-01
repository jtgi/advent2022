import { ErrorMessage } from "@hookform/error-message";
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from "react";
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";


export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <Controller
            name={name}
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  disabled={isSubmitting}
                  className='text-black'
                  onChange={onChange}
                  selected={value}
                  placeholderText={props.placeholder}
                />
              );
            }}
          />

        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
        input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            color: black;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextField
