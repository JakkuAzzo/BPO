import LoginTabs from '../components/LoginTabs';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <LoginTabs />
      </div>
    </div>
  );
}
