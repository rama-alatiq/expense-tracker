import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

function Auth() {
  const [isSignUp, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [authError, setAuthError] = useState(null);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    setMessage("");

    if (isSignUp && password.length < 6) {
      setAuthError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          console.log("supabase signUp error: ", error);
          setAuthError(error.message);
        } else {
          setMessage("Check your email for confirmation link!");
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) setAuthError(error.message);
      }
    } catch (error) {
      setAuthError("An unexpected error occurred");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-logo">
        <i className="lni lni-wallet"></i>
      </div>
      <div className="auth-title">
        <h4>Expense Tracker</h4>
        <p>Manage your finances effortlessly</p>
      </div>
      <div className="auth-container">
        <h2>{isSignUp ? "Create account" : "Welcome back"}</h2>
        <h6>
          {isSignUp
            ? "Sign up to start tracking your expenses."
            : "Enter your credentials to access your account"}
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            {}
          </button>
          {}
        </form>
        <p className="btn">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}{" "}
          <button type="button" onClick={() => setIsSignup(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign up"}
          </button>
        </p>
        {authError && <p className="auth-error-message">{authError}</p>}
        {message && <p className="email-confirm-message">{message}</p>}
      </div>
    </>
  );
}
export default Auth;
