import React from "react";
import PdfCom from "../../components/PdfCom";
import Loading from "../../components/Loading";
import axios from "axios";
/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Index({ data }) {
  if (!data) {
    return <Loading />;
  }
  return <PdfCom data={data} />;
}
export async function getServerSideProps(context) {
  const { phone } = context.query;
  const { data } = await axios.get(
    `${process.env.url}/api/manage/getPdfInfo?userPhone=${phone}`
  );

  return { props: { data: data } };
}
