import Header from '../components/Header'
import Footer from '../components/Footer'

function Login() {
  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-container">
          <div className="auth-header">
            <p className="section-label">WELCOME BACK</p>
            <h1>LOGIN TO THRIVO</h1>
            <p>
              Sign in to manage your account and your archive.
            </p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="YOUR PASSWORD"
              />
            </div>

            <button type="submit" className="auth-button">
              LOGIN
            </button>
          </form>

          <p className="auth-switch">
            DON'T HAVE AN ACCOUNT? <a href="/register">REGISTER</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Login