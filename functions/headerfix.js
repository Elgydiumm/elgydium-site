addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const response = await fetch(request)
    const url = new URL(request.url)
    // Check if the request is for a JavaScript module in your immutable chunks folder
    if (url.pathname.startsWith('/_app/immutable/chunks/') && url.pathname.endsWith('.js')) {
      const newHeaders = new Headers(response.headers)
      newHeaders.set('Content-Type', 'application/javascript; charset=utf-8')
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      })
    }
    return response
  }
  