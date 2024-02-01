import { styled } from "styled-components"
import { auth, db, storage } from "../firebase"
import { useEffect, useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore"
import { ITweet } from "../components/timeline"
import Tweet from "../components/tweet"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`
const AvatarUpload = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`
const AvatarImg = styled.img`
  width: 100%;
`
const AvatarInput = styled.input`
  display: none;
`
const Name = styled.span`
  font-size: 22px;
`
const Input = styled.input``

const Tweets = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonWrap = styled.div`
  display: inline-flex;
  gap: 10px;
`

const Button = styled.button`
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  background-color: transparent;
  &.cancle,
  &.edit {
    border: 1px solid white;
  }
  &.save {
    background-color: #1d9bf0;
  }
`

// auth 에 있는 이미지 값이 아니라 userDB 에 있는 값을 업데이트해야한다...

export default function Profile() {
  const user = auth.currentUser
  const [isEdited, setEdited] = useState(false)
  const [name, setName] = useState<string>("")
  const [avatar, setAvatar] = useState(user?.photoURL)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [tweets, setTweets] = useState<ITweet[]>([])

  useEffect(() => {
    setAvatarUrl()
    getUserInformation()
    fetchTweets()
  }, [])

  const setAvatarUrl = async () => {
    const imgRef = ref(storage, `avatars/${user?.uid}`)
    const url = await getDownloadURL(imgRef)
    if (!url) {
      setAvatar(user?.photoURL)
    } else {
      setAvatar(url)
    }
  }

  const getUserInformation = async () => {
    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", user?.uid)
    )

    const snapshot = await getDocs(userQuery)
    snapshot.docs.find((doc) => {
      const { uid, name } = doc.data()
      if (uid === user?.uid) {
        setName(name)
        console.log("profile doc", doc.data())
      }
    })
  }

  const onNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onEdited = () => {
    setEdited(true)
  }

  const onCancled = () => {
    setEdited(false)
    setName(user?.displayName ?? "Anonymous")
    getUserInformation()
    setAvatarUrl()
  }

  const onChanged = async () => {
    if (!user) return
    try {
      if (avatarFile) {
        const locationRef = ref(storage, `avatars/${user?.uid}`)
        await uploadBytes(locationRef, avatarFile)
      }
      const documentsRef = doc(db, "users", user.uid)
      await updateDoc(documentsRef, {
        name: name,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setEdited(false)
      await fetchTweets()
    }
  }

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!user) return
    if (files && files.length === 1) {
      const file = files[0]
      setAvatarFile(file)
      const url = URL.createObjectURL(file)
      setAvatar(url)
    }
  }
  const getUserByRef = async (userRef: DocumentReference) => {
    const userSnapshot = await getDoc(userRef)
    return userSnapshot.data()
  }

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    )

    const snapshot = await getDocs(tweetQuery)
    const tweets = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const { photo, tweet, userId, userRef, createdAt } = doc.data()
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
  }
  return (
    <Wrapper>
      <AvatarUpload htmlFor='avatar'>
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path d='M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z' />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id='avatar'
        type='file'
        accept='image/*'
        disabled={!isEdited}
      />
      {isEdited ? (
        <Input onChange={onNameChange} value={name} type='text' />
      ) : (
        <Name>{name}</Name>
      )}
      {isEdited ? (
        <ButtonWrap>
          <Button className='cancle' onClick={onCancled}>
            cancle
          </Button>
          <Button className='save' onClick={onChanged}>
            save
          </Button>
        </ButtonWrap>
      ) : (
        <Button className='edit' onClick={onEdited}>
          edit
        </Button>
      )}

      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  )
}
