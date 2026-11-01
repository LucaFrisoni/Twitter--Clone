// Adds a new page to the feed without repeating tweets and detects when the feed has ended.
const includesItem = (items: any[], item: any) =>
  items.some(({ _id }) => _id === item._id);

export const mergeFeedPage = (current: any[], page: any[], pageSize: number) => {
  const newItems = page.filter((item) => !includesItem(current, item));
  return {
    items: [...current, ...newItems],
    hasMore: newItems.length > 0 && page.length === pageSize,
  };
};
