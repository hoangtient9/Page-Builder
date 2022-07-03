import Head from 'next/head';
import { Grid } from '@nextui-org/react';
import { Builder, item, branch } from 'build-ui';
import utilStyles from '../../styles/utils.module.css';

import Layout from '../../components/layout';
import { fetchPages } from '../../utils/request';
import ViewContainer from '../../Containers/ViewContainer';

export default function customer({ result }) {
  const section = item({
    type: 'Section',
    props: {},
  });
  const tree = branch(section);

  return (
    <Layout home>
      <Head>
        <title>Customer</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Builder tree={tree}>
          <Grid.Container gap={2} justify="center">
            <ViewContainer data={result} />
          </Grid.Container>
        </Builder>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const result = await fetchPages();
  return {
    props: {
      result,
    },
  };
}
