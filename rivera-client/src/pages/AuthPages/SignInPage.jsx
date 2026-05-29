import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const SignInPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser({ email, password });
      
      // Check if user is a viewer - prevent login
      if (response.type === "viewer") {
        setError("Viewers do not have access to the dashboard.");
        return;
      }

      // Store user info and token in localStorage
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("userRole", response.type);
      localStorage.setItem("userName", response.firstName);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Welcome Back</h1>

        {error ? (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" className={inputClasses} />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" className={inputClasses} />
          </div>

          <Button type="submit" variant="primary" className="w-full py-3">
            Log In
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-zinc-600">
          No account? {" "}
          <Link to="/auth/signup" className="font-semibold underline text-zinc-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;