import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-terminal">
        <div className="not-found-header">
          <div className="not-found-dot" />
          <span className="not-found-title">terminal — 404</span>
        </div>
        <div className="not-found-body">
          <div className="not-found-line">
            <span className="not-found-prompt">$</span>
            <span className="not-found-cmd">curl -I https://ebin.pro{"{path}"}</span>
          </div>
          <div className="not-found-line">
            <span className="not-found-output">HTTP/2 404</span>
          </div>
          <div className="not-found-line">
            <span className="not-found-output not-found-dim">content-type: text/html</span>
          </div>
          <div className="not-found-line">
            <span className="not-found-output not-found-dim">x-powered-by: Next.js</span>
          </div>
          <div className="not-found-line not-found-gap">
            <span className="not-found-error">{">"} 404 — Page not found.</span>
          </div>
          <div className="not-found-line">
            <span className="not-found-prompt">$</span>
            <Link href="/" className="not-found-home">cd /home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
