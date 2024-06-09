import LinkButton from "./LinkButton";

import importedStyles from "./Pagination.module.css";

export default function Pagination(props) {
  const items = Math.max(parseInt(props.items) || 1, 1);
  const itemsPerPage = Math.max(parseInt(props.itemsPerPage) || 1, 1);
  const maximumPagesPerSide = Math.max(parseInt(props.maximumPagesPerSide) || 0, 0);
  const onClick = props.onClick;
  const page = Math.max(parseInt(props.page) || 1, 1);
  const pages = Math.ceil(items / itemsPerPage);
  const styles = props.styles || importedStyles;

  const isEnablingPreviousPage = page > 1;
  const isEnablingNextPage = page < pages;

  const previousPage = isEnablingPreviousPage ? page - 1 : page;
  const nextPage = isEnablingNextPage ? page + 1 : page;

  let pageMinimum = page - maximumPagesPerSide;
  let pageMaximum = page + maximumPagesPerSide;

  if (pageMinimum < 1 && pageMaximum > pages) {
    pageMinimum = 1;
    pageMaximum = pages;
  } else if (pageMinimum < 1) {
    pageMaximum = Math.min(pageMaximum + (1 - pageMinimum), pages);
    pageMinimum = 1;
  } else if (pageMaximum > pages) {
    pageMinimum = Math.max(pageMinimum - (pageMaximum - pages), 1);
    pageMaximum = pages;
  }

  const array = [];

  for (let i = pageMinimum; i <= pageMaximum; i++) {
    array.push(i);
  }

  function handleClick(currentPage) {
    if (currentPage !== page && onClick) {
      onClick(currentPage);
    }
  }

  return (
    <div className={styles.pagination}>
      <ul>
        <li>
          <LinkButton disabled={!isEnablingPreviousPage} onClick={() => handleClick(previousPage)}>
            &laquo;
          </LinkButton>
        </li>
        {array.map((currentPage) => (
          <li key={"page-" + currentPage}>
            <LinkButton disabled={currentPage === page} onClick={() => handleClick(currentPage)}>
              {currentPage}
            </LinkButton>
          </li>
        ))}
        <li>
          <LinkButton disabled={!isEnablingNextPage} onClick={() => handleClick(nextPage)}>
            &raquo;
          </LinkButton>
        </li>
      </ul>
    </div>
  );
}
