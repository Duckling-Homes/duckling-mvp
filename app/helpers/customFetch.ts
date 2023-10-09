async function customFetch(url: string, options: RequestInit = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // TODO fix this value when we have organizations and auth. Right now, we'll just use
      // our local hardcoded value
      'organization-context': 'a4b5aa52-274d-4b1e-8f6b-3828f74c72d3', 
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
  