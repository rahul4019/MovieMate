'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchDataFromApi } from "@/utils/api"
import { getApiConfiguration } from "./store/homeSlice"



export default function Home() {
  const dispatch = useDispatch();
  const { url } = useSelector(state => state.home)
  console.log(url)

  useEffect(() => {
    const apiTesting = () => {
      fetchDataFromApi('/movie/popular')
        .then(res => {
          dispatch(getApiConfiguration(res))
        })
    }
    apiTesting();
  }, [])


  return (
    <div>{url?.total_pages}</div>
  )
}
