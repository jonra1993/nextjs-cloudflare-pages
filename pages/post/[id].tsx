import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { GetPost } from '../../lib/postdata_api'
import { PostData } from '../../types/postdata'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Test from '../../components/test'

interface IPost {
  source: any
}

const Post:  FC<IPost> = (props)  => {
  const { source } = props
  const [postData, setPostData] = useState<null | PostData>(null)
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
      <MDXRemote {...source} components={components} />

      <Link href="/">
        Go back to home
      </Link>
    </main>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component <Test />'
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}

export default Post
