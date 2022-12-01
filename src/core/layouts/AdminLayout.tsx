import { BlitzLayout } from "@blitzjs/next";
import Head from "next/head";
import React from "react";

const AdminLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Advent 2022"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto w-full h-full max-w-5xl space-y-5">{children}</main>
    </>
  )
}

export default AdminLayout
