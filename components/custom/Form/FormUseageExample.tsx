"use client";
import React from "react";
import { FieldValues } from "react-hook-form";
import DynamicForm from "./DynamicForm";
import { FormConfig } from "./Formtypes.types";

export default function DemoFormPage() {
  // formConfig definition
  const formConfig:FormConfig<any> = {
    title: "User Registration",
    description: "Fill in the details below to create your account.",
    fullWidthButtons: true,
    gridCols: 1, // 2-column grid
    sections: [
      {
        title: "Personal Info",
        description: "Your basic personal information",
        collapsible: false,
        fields: [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            placeholder: "Enter your first name",
            validation: { required: "First name is required" },
            colSpan: 2,
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            placeholder: "Enter your last name",
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            placeholder: "you@example.com",
            validation: {
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email format",
              },
            },
          },
          {
            name: "welcome",
            type: "custom",
            label: "",
            render: () => (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Welcome!</h4>
                <p className="text-blue-700 text-sm">
                  Please fill out your information below to get started.
                </p>
              </div>
            ),
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            validation: { required: "Password is required" },
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Re-enter password",
          },
          {
            name: "newsletter",
            label: "Subscribe to newsletter?",
            type: "checkbox",
          },
          {
            name: "volume",
            label: "Volume Level",
            type: "range",
          },
          {
            name: "gender",
            label: "Gender",
            type: "radio",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ],
            validation: { required: "Please select your gender" },
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            placeholder: "Select a country",
            options: [
              { label: "India", value: "in" },
              { label: "United States", value: "us" },
              { label: "United Kingdom", value: "uk" },
            ],
            validation: { required: "Country is required" },
          },
          {
            name: "skills",
            label: "Skills",
            type: "multiselect",
            placeholder: "Select your skills",
            options: [
              { label: "JavaScript", value: "js" },
              { label: "React", value: "react" },
              { label: "Node.js", value: "node" },
              { label: "Python", value: "python" },
            ],
            validation: { required: "At least one skill is required" },
          },
        ],
      },
    ],
  };

  // handlers
  const handleSubmit = (data: FieldValues) => {
    console.log("Form submitted ✅", data);
  };

  const handleError = (errors: any) => {
    console.log("Form errors ❌", errors);
  };

  const handleDraftSave = (draftData: FieldValues) => {
    console.log("Draft saved 💾", draftData);
  };

  return (
    <div className="">
      <DynamicForm
        formConfig={formConfig as any}
        onSubmit={handleSubmit}
        submitButtonText="Register"
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          newsletter: false,
          skills: ["js", "react"],
        }}
      />
    </div>
  );
}
