import { defineLoader } from 'vitepress'

export interface OpenApiSchema {
  type: string
  properties: Record<string, {
    type?: string
    description?: string
    $ref?: string
    enum?: string[]
    default?: unknown
  }>
  required?: string[]
}

declare const data: Record<string, OpenApiSchema>
export { data }

export default defineLoader({
  async load(): Promise<Record<string, OpenApiSchema>> {
    try {
      const res = await fetch('https://api.esluce.com/openapi.json', {
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) {
        console.warn(`OpenAPI fetch failed with status ${res.status}; using empty schemas`)
        return {}
      }
      const spec: { components?: { schemas?: Record<string, OpenApiSchema> } } = await res.json()
      return spec.components?.schemas ?? {}
    } catch (err) {
      console.warn(`Failed to fetch OpenAPI spec: ${err}; using empty schemas`)
      return {}
    }
  },
})
