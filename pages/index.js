import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { Button, Grid } from '@nextui-org/react';
import { Builder, Workspace, item, branch } from 'build-ui';

import Panel from '../components/Panel';
import MenuBar from '../components/MenuBar';
import SectionView from '../components/SectionView';
import AlertView from '../components/alert/AlertView';
import AlertTools from '../components/alert/AlertTools';
import ParagraphView from '../components/paragraph/ParagraphView';
import ParagraphTools from '../components/paragraph/ParagraphTools';
import { fetchPages } from '../utils/request';
import styles from './admin.module.css';
export default function Home({ result }) {
  const view = {
    Section: SectionView,
    Alert: AlertView,
    Paragraph: ParagraphView,
  };
  const section = item({
    type: 'Section',
    props: {},
  });
  const tree = branch(section);

  return (
    <Layout home>
      <Head>
        <title>Admin</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Builder initialTree={tree}>
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} justify="center">
              <MenuBar data={result} />
            </Grid>
            <Grid xs={2} direction="column" alignItems="center">
              <Button.Group>
                <AlertTools />
              </Button.Group>
              <ParagraphTools />
            </Grid>
            <Grid xs={5} className={styles.view}>
              <Workspace view={view} />
            </Grid>
            <Grid justify="center" xs={5} className={styles.panel}>
              <Panel />
            </Grid>
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
