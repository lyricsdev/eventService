import { useAxios } from '@/utils/api'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
interface hackathon {
  id: string,
  name: string,
  startDate: string,
  endDate: string
}
export const getServerSideProps = (async (context) => {
  const hackathon = await useAxios.get("/hackathon") as hackathon[]
  return { props: { hackathon } }
}) satisfies GetServerSideProps<{
  hackathon: hackathon[]
}>
export default function Home({hackathon} : {hackathon: hackathon[]}) {
  return (
  <div className="container m-auto p-4 bg-white min-h-full">
    {
      hackathon && hackathon.map(it=>
      <div key={it.id} className="bg-white text-center text-black w-2/5">
        {it.name}
        <div className="absolute bg-red-500 w-32 h-32"> </div>
      </div>
      )
    }
  </div>
  )
}
