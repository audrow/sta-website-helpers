export function listToString(items: string[], and = 'and') {
  if (items.length === 0) {
    throw new Error('items must not be empty')
  }
  const trimmedItems = items.map((i) => i.trim())
  if (trimmedItems.some((i) => i === '')) {
    throw new Error(
      'items must not contain empty strings (white space is trimmed)',
    )
  }
  if (trimmedItems.length === 1) {
    return trimmedItems[0]
  } else if (trimmedItems.length === 2) {
    return `${trimmedItems[0]} ${and} ${trimmedItems[1]}`
  } else {
    return `${trimmedItems.slice(0, -1).join(', ')}, and ${
      trimmedItems.slice(-1)[0]
    }`
  }
}
