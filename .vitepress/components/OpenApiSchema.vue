<script setup lang="ts">
import { data as schemas } from '../loaders/openapi.data'

const props = defineProps<{
  ref: string          // e.g. "#/components/schemas/CreateServerRequest"
  type?: 'request' | 'response'
}>()

const schemaName = props.ref.split('/').pop()!
const schema = schemas[schemaName]
const properties = schema?.properties || {}
const required = schema?.required || []
</script>

<template>
  <div class="schema-table-wrapper">
    <div v-if="props.type === 'request'" class="schema-context-label">Request Body Schema</div>
    <div v-else-if="props.type === 'response'" class="schema-context-label">Response Schema</div>
    <table v-if="schema" class="schema-table">
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
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="schema-missing">Schema "{{ schemaName }}" not found in OpenAPI spec. See <StaticSchema documentation for manual schema definitions.</p>
  </div>
</template>
