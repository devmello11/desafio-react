import RegisterForm from '@/components/forms/RegistroForm';
import { GetServerSideProps } from 'next';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {
  
  return {
    props: {} 
  };
};
