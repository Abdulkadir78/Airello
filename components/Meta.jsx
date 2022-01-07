import Head from "next/head";

function Meta({ title }) {
  return (
    <Head>
      <title>{title ? `Airello - ${title}` : "Airello"}</title>
      <meta
        name="description"
        content="Airello is a your one stop task manager."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default Meta;
