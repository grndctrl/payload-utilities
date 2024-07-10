import type { FieldHook } from 'payload'
import slugify from 'slugify'

const formatSlug =
  (fieldToUse: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    const { text, isOverrideActive } = value

    if (isOverrideActive) {
      return {
        text: slugify(text, { lower: true }),
        isOverrideActive,
      }
    }

    const fallback = data?.[fieldToUse] || originalDoc?.[fieldToUse]

    if (fallback && typeof fallback === 'string') {
      return {
        text: slugify(fallback, { lower: true }),
        isOverrideActive,
      }
    }

    return {
      text: slugify('error', { lower: true }),
      isOverrideActive,
    }
  }

export { formatSlug }
