"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid username or password");
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">

      <div className="admin-bg">
        <div className="admin-grid" />
        <div className="admin-orb admin-orb-one" />
        <div className="admin-orb admin-orb-two" />
      </div>

      {/* LEFT SIDE */}
      <section className="admin-brand">

        <div className="admin-brand-top">
          <div className="admin-logo">O</div>

          <div>
            <div className="admin-brand-name">
              OUTVERSE
            </div>

            <div className="admin-brand-subtitle">
              ADMIN CONTROL
            </div>
          </div>
        </div>

        <div className="admin-brand-content">

          <div className="admin-status">
            <span className="admin-status-dot" />
            SYSTEM ONLINE
          </div>

          <h1>
            Your website.
            <br />
            <span>Under your control.</span>
          </h1>

          <p>
            Manage your content, projects, media and digital
            experience from one secure workspace.
          </p>

          <div className="admin-brand-features">

            <div>
              <span>01</span>
              <strong>Content</strong>
              <small>Manage everything</small>
            </div>

            <div>
              <span>02</span>
              <strong>Projects</strong>
              <small>Manage your work</small>
            </div>

            <div>
              <span>03</span>
              <strong>Media</strong>
              <small>Control your visuals</small>
            </div>

          </div>

        </div>

        <div className="admin-brand-footer">
          <span>OUTVERSE</span>
          <span>PRIVATE ADMIN AREA</span>
        </div>

      </section>


      {/* RIGHT SIDE */}
      <section className="admin-login-side">

        <div className="admin-mobile-brand">
          <div className="admin-logo">O</div>

          <div>
            <div className="admin-brand-name">
              OUTVERSE
            </div>

            <div className="admin-brand-subtitle">
              ADMIN
            </div>
          </div>
        </div>


        <div className="admin-card">

          <div className="admin-card-glow" />

          <div className="admin-card-header">

            <div className="admin-lock">
              🔐
            </div>

            <div className="admin-welcome">
              WELCOME BACK
            </div>

            <h2>
              Sign in
            </h2>

            <p>
              Access your Outverse control center.
            </p>

          </div>


          <form
            onSubmit={handleLogin}
            className="admin-form"
          >

            {/* USERNAME */}
            <div className="admin-field">

              <label htmlFor="username">
                USERNAME
              </label>

              <div className="admin-input-wrap">

                <span className="admin-input-icon">
                  @
                </span>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="admin-field">

              <div className="admin-label-row">

                <label htmlFor="password">
                  PASSWORD
                </label>

                <span>
                  SECURE
                </span>

              </div>

              <div className="admin-input-wrap">

                <span className="admin-input-icon">
                  •
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>

              </div>

            </div>


            {/* ERROR */}
            {error && (
              <div className="admin-error">

                <div className="admin-error-icon">
                  !
                </div>

                <div>
                  <strong>
                    Authentication failed
                  </strong>

                  <p>
                    {error}
                  </p>
                </div>

              </div>
            )}


            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="admin-submit"
            >

              <span>
                {loading
                  ? "AUTHENTICATING..."
                  : "ENTER CONTROL CENTER"}
              </span>

              {!loading && (
                <span className="admin-submit-arrow">
                  →
                </span>
              )}

            </button>

          </form>


          <div className="admin-card-footer">

            <div className="admin-secure">
              <span />
              SECURE CONNECTION
            </div>

            <span>
              OUTVERSE © 2026
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}