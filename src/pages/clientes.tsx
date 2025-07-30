import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectClientes() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/clients');
  }, [router]);
  return null;
}
