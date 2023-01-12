import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

import Menu from '../components/menu/menu';
import WithPrivateRoute from '../components/WithPrivateRoute.js'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Menu
        mode="horizontal"
        openAnimation="slide-up"
      />
    </>
  );
}

Home.Auth = WithPrivateRoute