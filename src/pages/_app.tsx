import "@/styles/globals.css";
import "../components/CardSummary/CardSummary.scss";
import "../components/AddButton/AddButton.scss";
import "../components/CardItem/CardItem.scss";
import "../components/AddExpenseForm/AddExpenseForm.scss";
import "@/styles/details.scss";
import Layout from "@/layout/Layout";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
