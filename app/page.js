import { fetchDataFromApi } from "@/utils/api"

export default function Home() {
  const apiTesting = () => {
    fetchDataFromApi('/movie/popular')
      .then((res) => console.log(res))
  }
  apiTesting()
  return (
    <div>Hello movieMate</div>
  )
}
