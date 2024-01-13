import { addDoc, collection, updateDoc } from "firebase/firestore"
import { auth, db, storage } from "../firebase"
import { useState } from "react"
import { styled } from "styled-components"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`
const AttachFileInput = styled.input`
  display: none;
`

const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
`
const PreviewImg = styled.img`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 50%;
  }
`
const DeletePreviewButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 2rem;
  width: 2rem;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
`
const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false)
  const [tweet, setTweet] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [imgUrl, setImgUrl] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("files 작동하는가?")
    const { files } = e.target
    if (files && files.length === 1) {
      setFile(files[0])
      const url = URL.createObjectURL(files[0])
      setImgUrl(url)
    }
  }

  const onDeletePreview = () => {
    setFile(null)
    setImgUrl("")
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user || isLoading || tweet === "" || tweet.length > 180) return

    try {
      setLoading(true)
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || "Anonymous",
        userId: user.uid,
      })
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`)
        const result = await uploadBytes(locationRef, file)
        const url = await getDownloadURL(result.ref)
        await updateDoc(doc, {
          photo: url,
        })
      }
      setTweet("")
      setFile(null)
      setImgUrl("")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder='What is happening?'
      />
      <AttachFileButton htmlFor='file'>
        {file ? "Photo added ✓" : "Add Photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type='file'
        id='file'
        accept='image/*'
      />
      {imgUrl ? (
        <PreviewWrapper>
          <PreviewImg src={imgUrl} />
          <DeletePreviewButton onClick={onDeletePreview}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='#1d9bf0'
              className='w-5 h-5'
            >
              <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
            </svg>
          </DeletePreviewButton>
        </PreviewWrapper>
      ) : null}
      <SubmitButton
        type='submit'
        value={isLoading ? "Posting.." : "Post tweet"}
      />
    </Form>
  )
}
