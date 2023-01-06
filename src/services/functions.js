export const voteSorter = (obj1, obj2) => {
  return (obj2.approved - obj2.rejected) - (obj1.approved - obj1.rejected)
}