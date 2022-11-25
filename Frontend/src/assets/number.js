export const digits = (num) => {
  if (!/^\d*(\.\d+)?$/.test(num)) { return num }
  const numString = num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  const numArray = numString.split('.')
  if (!Number(numArray[1])) {
    return numArray[0]
  }
  return numString
}