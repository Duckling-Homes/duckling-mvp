async function customFetch(url: string, options: RequestInit = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // TODO add this back when we have a need for an org switcher. We would then validate the
      // org is valid in the middleware layer. But for now, we can just inject the header from the middleware
      // 'organization-context': 'a4b5aa52-274d-4b1e-8f6b-3828f74c72d3', 
    };
  
    const mergedOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
  
    const response = await fetch(url, mergedOptions);
  
    return response;
  }
  
  export default customFetch;
  