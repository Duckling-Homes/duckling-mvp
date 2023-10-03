async function customFetch(url: string, options: RequestInit = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // TODO fix this value
      'organization-context': 'your-org-value', 
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
  