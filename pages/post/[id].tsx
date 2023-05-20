import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { GetPost } from '../../lib/postdata_api'
import { PostData } from '../../types/postdata'


interface IPost {
  data: any
}

const Post: FC<IPost> = (props) => {
  const { data } = props
  const [postData, setPostData] = useState<null | PostData>(null)
  const router = useRouter()
  const id = router.query.id as string

  useEffect(() => {
    if (!router.isReady) return
    GetPost(id).then(r => setPostData(r))
  }, [router.isReady, id])

  if (!postData) return <>'Loading...'</>

  return (
    <main >
      <Head>
        <title>{postData.title}</title>
      </Head>

      <h1>{postData.title}</h1>

      <p>{postData.body}</p>
      
      <iframe 
      srcDoc={data}       
      width="100%"
      height="600"
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

export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost/dynamic');
    const data = response.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        error: 'Error fetching data',
      },
    };
  }
}

export default Post
