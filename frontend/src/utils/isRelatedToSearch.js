const isRelatedToSearch = (product, search_text) => {
  const search_array = search_text.split(' ');
  for (const search of search_array) {
    if (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }
  }
  return false;
};

export default isRelatedToSearch;
