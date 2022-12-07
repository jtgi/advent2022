import { BlitzLayout } from "@blitzjs/next";
import Head from "next/head";
import React from "react";

const Layout: BlitzLayout<{title?: string; children?: React.ReactNode}> = ({title, children}) => {

  return (
    <>
      <Head>
        <title>{title || "Advent 2022"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

    </>
  )
}


export default Layout
