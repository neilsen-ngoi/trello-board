import { db } from '@/lib/db'
import Board from './board'
import { Form } from './form'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()
  return (
    <div className=" flex flex-col space-y-4">
      <Form />
      <div className=" space-y-2">
        {boards.map((board) => (
          // <div key={board.id}>Board title:{board.title}</div>
          <Board title={board.title} id={board.id} key={board.id} />
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
