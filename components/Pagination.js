import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPage,
  perPage = 12,
  page_link_url = "",
}) {
  const totalPages = Math.ceil(totalPage / perPage);

  const getPageNumbers = () => {
    const pages = [];

    // Case 1: If total pages ≤ 10, show all
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first 5 pages
    for (let i = 1; i <= 5; i++) pages.push(i);

    // Ellipsis
    pages.push("...");

    // Always show last 5 pages
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);

    return pages;
  };

  const getLink = (page) => {
    if (page === 1) return page_link_url;
    return `${page_link_url}page/${page}`;
  };

  return (
    <nav>
      currentPage  --{currentPage}
      <ul className="pagination justify-content-center">
        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link
            href={getLink(Math.max(1, currentPage - 1))}
            className="page-link"
          >
            Previous
          </Link>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((p, idx) => {
          if (p === "...") {
            return (
              <li key={idx} className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            );
          }

          // Mark current and previous page as active
          const isActive = currentPage == p ?true:false;

          return (
            <li key={p} className={`page-item ${isActive ? "active" : ""}`}>
              <Link href={getLink(p)} className="page-link">
                {p}
              </Link>
            </li>
          );
        })}

        {/* Next */}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <Link
            href={getLink(Math.min(totalPages, currentPage + 1))}
            className="page-link"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
