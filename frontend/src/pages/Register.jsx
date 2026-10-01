import Header from '../components/Header'
import Footer from '../components/Footer'

function Register() {
  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-container">
          <div className="auth-header">
            <p className="section-label">JOIN THE ARCHIVE</p>
            <h1>CREATE YOUR ACCOUNT</h1>
            <p>
              Create an account to buy and sell pieces on THRIVO.
            </p>
          </div>

          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                id="name"
                type="text"
                placeholder="YOUR NAME"
              />
            </div>

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
                placeholder="CREATE A PASSWORD"
              />
            </div>

            <button type="submit" className="auth-button">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="auth-switch">
            ALREADY HAVE AN ACCOUNT? <a href="/login">LOGIN</a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Register