import {
  DocumentReference,
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { db } from "../firebase"
import Tweet from "./tweet"
import { Unsubscribe } from "firebase/auth"

export interface ITweet {
  id: string
  photo?: string
  tweet: string
  userId: string
  userName: string
  createdAt: Date
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([])

  const getUserByRef = async (userRef: DocumentReference) => {
    const userSnapshot = await getDoc(userRef)
    return userSnapshot.data()
  }
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      )

      unsubscribe = await onSnapshot(tweetsQuery, async (snapshot) => {
        const tweets: ITweet[] = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const { photo, tweet, createdAt, userRef, userId } = doc.data()
            const userInformation = await getUserByRef(userRef)
            return {
              photo,
              tweet,
              createdAt,
              userId,
              userName: userInformation?.name,
              id: doc.id,
            }
          })
        )
        setTweets(tweets)
      })
    }
    fetchTweets()
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  )
}
