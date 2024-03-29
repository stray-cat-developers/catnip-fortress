import axios from 'axios'

const { hosts } = useRuntimeConfig()
const host = hosts.auth

export default defineEventHandler(async (event) => {
  try {
    const response = await axios.get(`${host}/v1/account/me`, {
      headers: { ...(getHeaders(event) as any) },
    })
    setResponseStatus(event, 200)
    return { ...response.data }
  } catch (e) {
    setResponseStatus(event, 400)
    if (axios.isAxiosError(e)) {
      setResponseStatus(event, e.status)
      return { message: e.message }
    } else {
      return { message: (e as Error).message }
    }
  }
})
