import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { GetPost } from '../../lib/postdata_api'
import { PostData } from '../../types/postdata'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Test from '../../components/test'
import Chart from '../../components/chart'
import LineChartComponent from '../../components/line'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
const components = { Test, Chart, LineChartComponent }
const Plotly = dynamic(() => import("react-plotly.js").then((module) => module.default), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const newhtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Sample Information Page</title>
  <script src='https://cdn.jsdelivr.net/npm/chart.js'></script>
</head>
<body>
  <h1>Sample Information Page</h1>

  <h2>Sample Text</h2>
  <p>This is an example paragraph of sample text.</p>

  <h2>Sample Image</h2>
  <img src='https://miro.medium.com/v2/da:true/resize:fit:1200/1*6152UsoKP_YGcf5Az047oQ.gif' alt='Sample Image' width='100%' height='300'>https://miro.medium.com/v2/da:true/resize:fit:1200/1*6152UsoKP_YGcf5Az047oQ.gif" alt="Sample Image" width="100%" height="300">

  <h2>Sample Chart</h2>
  <canvas id='myChart' width='500' height='200'></canvas>

  <script>
    // Chart.js code to create a sample chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Sample Data',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  </script>
</body>
</html>
`

const newHtml2 = `
<!DOCTYPE html>
<html>
<head>
  <title>Sample Information Page</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <h1>Sample Information Page</h1>

  <h2>Sample Text</h2>
  <p>This is an example paragraph of sample text.</p>

  <h2>Sample Image</h2>
  <img src="https://miro.medium.com/v2/da:true/resize:fit:1200/1*6152UsoKP_YGcf5Az047oQ.gif" alt="Sample Image" width="100%" height="300">

  <h2>Sample Chart</h2>
  <div id="myChart"></div>

  <script>
    // Plotly code to create a sample chart
    var data = [{
      x: ['January', 'February', 'March', 'April', 'May'],
      y: [12, 19, 3, 5, 2],
      type: 'bar',
      marker: {
        color: 'rgba(54, 162, 235, 0.5)'
      }
    }];

    var layout = {
      title: 'Sample Data',
      yaxis: {
        autorange: true,
        type: 'linear'
      }
    };

    Plotly.newPlot('myChart', data, layout);
  </script>
</body>
</html>
`;

interface IPost {
  source: any
}

const Post: FC<IPost> = (props) => {
  const { source } = props
  const [postData, setPostData] = useState<null | PostData>(null)
  const mdxSource = useRef<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>>()
  const router = useRouter()
  const id = router.query.id as string

  useEffect(() => {
    if (!router.isReady) return
    GetPost(id).then(r => setPostData(r))
  }, [router.isReady, id])

  if (!postData) return <>'Loading...'</>

  return (
    <main>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <h1>{postData.title}</h1>

      <p>{postData.body}</p>
      {mdxSource && <MDXRemote {...source} components={components} />}
      
      <iframe 
      srcDoc={newHtml2}       
      width="100%"
      height="400"
      frameBorder="0"
      title="Embedded Content"
      //sandbox="allow-same-origin"
      ></iframe>

      <Link href="/">
        Go back to home
      </Link>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // MDX text - can be from a local file, database, anywhere
  const source = `  
    ---
    title: Sample MDX
    date: 2023-05-17
    ---

    Some **mdx** text, with a component <Test />
    Hello, world!
    Below is an example of markdown in JSX.

    <div style={{padding: '1rem', backgroundColor: 'violet'}}>
      Try and change the background color to \`tomato\`.
    </div>

    # Welcome to MDX

    This is a sample MDX file demonstrating the usage of MDX syntax.

    ## Markdown Content

    You can write regular Markdown content here:

    - List item 1
    - List item 2
    - List item 3

    ## JSX Component

    You can also include JSX components and write interactive code:

    <Test />
    <Chart />
    <LineChartComponent />

  `;

  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
};

export default Post
