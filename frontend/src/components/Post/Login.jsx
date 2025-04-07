import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import "./Login.css";
import { useForm } from "react-hook-form";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("root", {
        message: err.message,
      });
      navigate("/login");
    }
  };

  return (
    <div className="login">
      <header className="login-details">
        <h1 className="login-title">Login</h1>
      </header>
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        {errors.root && <span className="error">{errors.root.message}</span>}
        <div>
          <input
            className="input"
            placeholder="Email"
            id="email"
            type="text"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            className="input"
            placeholder="Password"
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          role="submit-button"
          id="submit"
          type="submit"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="signup-text">
        Don't have an account?{" "}
        <Link className="loginButton" to="/signup">
          Sign Up Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
