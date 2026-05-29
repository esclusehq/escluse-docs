<script setup lang="ts">
const props = defineProps<{
  schema: {
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
  type?: 'request' | 'response'
}>()

const properties = props.schema?.properties || {}
const required = props.schema?.required || []
</script>

<template>
  <div class="schema-table-wrapper">
    <div v-if="props.type === 'request'" class="schema-context-label">Request Body Schema</div>
    <div v-else-if="props.type === 'response'" class="schema-context-label">Response Schema</div>
    <table v-if="props.schema" class="schema-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prop, name) in properties" :key="String(name)">
          <td><code>{{ name }}</code></td>
          <td>{{ prop.type || prop.$ref?.split('/').pop() || 'object' }}</td>
          <td>{{ required.includes(String(name)) ? 'Yes' : 'No' }}</td>
          <td>
            {{ prop.description || '-' }}
            <span v-if="prop.enum" class="schema-enum-hint">Possible values: {{ prop.enum.join(', ') }}</span>
            <span v-if="prop.default !== undefined" class="schema-default-hint">Default: <code>{{ prop.default }}</code></span>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="schema-missing">No schema provided.</p>
  </div>
</template>
