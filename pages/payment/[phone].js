import React from "react";
import PayNowForm from "../../components/PayNowForm";
import Loading from "../../components/Loading";
import axios from "axios";
/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Index({data}) {
  if (!data) {
    return <Loading />;
  }
  return <PayNowForm data={data.persons} />;
}
export async function getServerSideProps(context) {
  const { phone } = context.query;
  const { data } = await axios.get(
    `${process.env.url}/api/manage/getDeshboardInfo?userPhone=${phone}`
  );

  return { props: { data: data } };
}
