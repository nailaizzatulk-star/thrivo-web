import Header from '../components/Header'
import Footer from '../components/Footer'

function Profile() {
  return (
    <>
      <Header />

      <main className="profile-page">
        <section className="profile-container">

          <div className="profile-header">
            <p className="section-label">MY ACCOUNT</p>
            <h1>WELCOME BACK</h1>
            <p>
              Manage your account and your listed pieces.
            </p>
          </div>

          <div className="profile-info">

            <div className="profile-card">
              <p className="profile-card-label">ACCOUNT</p>

              <div className="profile-detail">
                <span>NAME</span>
                <strong>YOUR NAME</strong>
              </div>

              <div className="profile-detail">
                <span>EMAIL</span>
                <strong>YOUR EMAIL</strong>
              </div>

              <button className="profile-button">
                EDIT PROFILE
              </button>
            </div>

            <div className="profile-card">
              <p className="profile-card-label">MY ARCHIVE</p>

              <div className="profile-detail">
                <span>LISTED ITEMS</span>
                <strong>0 PIECES</strong>
              </div>

              <div className="profile-detail">
                <span>SOLD ITEMS</span>
                <strong>0 PIECES</strong>
              </div>

              <a href="/sell" className="profile-button">
                SELL AN ITEM
              </a>
            </div>

          </div>

          <section className="my-listings">
            <div className="listings-header">
              <div>
                <p className="section-label">YOUR PIECES</p>
                <h2>MY LISTINGS</h2>
              </div>

              <a href="/sell" className="listing-link">
                + LIST NEW ITEM
              </a>
            </div>

            <div className="empty-listings">
              <p>NO ITEMS LISTED YET.</p>
              <span>
                Your listed pieces will appear here.
              </span>
            </div>
          </section>

        </section>
      </main>

      <Footer />
    </>
  )
}

export default Profile