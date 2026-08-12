import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function createStubClient() {
  const message = 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
  const stubResult = { data: [], error: new Error(message) }
  const thenable = { then: (resolve) => resolve(stubResult) }
  const chain = new Proxy(thenable, {
    get(target, prop) {
      if (prop === 'then') return target.then.bind(target)
      return chain
    },
  })
  return new Proxy({}, {
    get() { return chain },
  })
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createStubClient()

export default supabase
