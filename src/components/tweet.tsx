import { styled } from "styled-components"
import { ITweet } from "./timeline"
import { auth, db, storage } from "../firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"

const Wrapper = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: 3fr 1fr; */
  /* grid-template-rows: max-content; */
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`
const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const PhotoColumn = styled.div``
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`
const Username = styled.span`
  font-weight: 400;
  font-size: 13px;
`
const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const DeleteButton = styled.button`
  display: flex;
  align-items: end;
  flex-direction: row;
  background-color: transparent;
  color: tomato;
  border: 0;
  border-radius: 5px;
  border: 1px solid tomato;
  font-weight: 600;
  font-size: 10px;
  padding: 5px;
  text-transform: uppercase;
  cursor: pointer;
`

const CreatedAt = styled.span`
  display: flex;
  flex: 1 0 auto;
  align-items: end;
  flex-direction: row-reverse;
  font-style: italic;
  color: gray;
  font-size: 10px;
`

export default function Tweet({
  userName,
  photo,
  tweet,
  userId,
  id,
  createdAt,
}: ITweet) {
  const user = auth.currentUser
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?")
    if (!ok || user?.uid !== userId) return
    try {
      await deleteDoc(doc(db, "tweets", id))
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`)
        await deleteObject(photoRef)
      }
    } catch (error) {
      console.error(error)
    }
    // finally {}
  }
  return (
    <Wrapper>
      <ColumnWrapper>
        <TextColumn>
          <Username>{userName}</Username>
          <Payload>{tweet}</Payload>
        </TextColumn>
        {photo && (
          <PhotoColumn>
            <Photo src={photo} />
          </PhotoColumn>
        )}
      </ColumnWrapper>
      <BottomWrapper>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
        <CreatedAt>{new Date(createdAt).toLocaleDateString("en-GB")}</CreatedAt>
      </BottomWrapper>
    </Wrapper>
  )
}
