export default function PostLoading() {
  return (
    <div className="blog-page">
      <nav className="blog-page-nav">
        <div className="skeleton skeleton-sm" style={{ width: "80px" }} />
      </nav>

      <article className="blog-post">
        <header className="blog-post-header">
          <div className="skeleton skeleton-sm" style={{ width: "200px", marginBottom: "1rem" }} />
          <div className="skeleton skeleton-xl" style={{ width: "100%", maxWidth: "600px", marginBottom: "0.75rem" }} />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className="skeleton skeleton-sm" style={{ width: "70px" }} />
            <div className="skeleton skeleton-sm" style={{ width: "90px" }} />
          </div>
        </header>

        <div className="blog-post-body">
          <div className="skeleton skeleton-md" style={{ width: "100%", marginBottom: "0.75rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "95%", marginBottom: "0.75rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "88%", marginBottom: "1.5rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "100%", marginBottom: "0.75rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "92%", marginBottom: "0.75rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "75%", marginBottom: "1.5rem" }} />
          <div className="skeleton skeleton-lg" style={{ width: "60%", marginBottom: "1rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "100%", marginBottom: "0.75rem" }} />
          <div className="skeleton skeleton-md" style={{ width: "85%", marginBottom: "0.75rem" }} />
        </div>
      </article>
    </div>
  );
}
