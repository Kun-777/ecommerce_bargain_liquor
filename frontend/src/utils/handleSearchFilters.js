export const handleSearchFilters = (event, search, setSearch) => {
  if (event.target.checked) {
    if (search === null) {
      // nothing is checked
      setSearch(event.target.name);
    } else {
      setSearch(`${search}||${event.target.name}`);
    }
  } else {
    if (search.includes(`||${event.target.name}`)) {
      // the filter is not the first filter
      setSearch(search.replace(`||${event.target.name}`, ''));
    } else if (search.includes(`${event.target.name}||`)) {
      setSearch(search.replace(`${event.target.name}||`, ''));
    } else {
      // removing the last param
      setSearch(null);
    }
  }
};
