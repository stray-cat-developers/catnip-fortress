import axios, { AxiosError } from 'axios'

const { hosts } = useRuntimeConfig()
const host = hosts.auth

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.email || !body.password) {
    // missing params, throw error
  }
  try {
    const response = await axios.post(`${host}/v1/account/sign-in`, body)
    setHeaders(event, { ...response.headers } as any)
    setResponseStatus(event, 200)
  } catch (e) {
    setResponseStatus(event, 400)
    if (axios.isAxiosError(e)) {
      setResponseStatus(event, e.status)
      setCookie(event, 'SESSION', '', {
        expires: new Date(0),
      })
      return { message: e.message }
    } else {
      return { message: (e as Error).message }
    }
  }
})
