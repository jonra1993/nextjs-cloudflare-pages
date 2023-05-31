import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import Post from '../components/post'
import { PostData, PostDataListProps } from '../types/postdata'
import { GetPosts } from '../lib/postdata_api'
import dynamic from 'next/dynamic'

const AdaptiveCardsSampleWithNoSSR = dynamic(
  () => import('../components/adaptive-card'),
  { ssr: false }
)

export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of posts
  const posts: PostData[] = await GetPosts()
  return {
    props: {
      postDataList: posts,
    },
  }
}

const IndexPage: NextPage<PostDataListProps> = ({
  postDataList,
}: PostDataListProps) => {
  return (
    <main>
      <Head>
        <title>Home page</title>
      </Head>
      <AdaptiveCardsSampleWithNoSSR />

      <h1>List of posts</h1>

      <section>
        {postDataList.map((post: PostData) => (
          <Post {...post} key={post.id} />
        ))}
      </section>
    </main>
  )
}

export default IndexPage
