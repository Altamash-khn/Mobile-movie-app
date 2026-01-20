import { useState } from "react";

async function useFetch(fetchFunction: () => Promise<any>) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  try {
    setLoading(true);
    setError(null);
    const result = await fetchFunction();
    setData(result);
  } catch (error) {
    setError(error instanceof Error ? error : new Error("An error occurred"));
  } finally {
    setLoading(false);
  }
}
