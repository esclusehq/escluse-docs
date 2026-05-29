# Profiling & Diagnostics

Server profiling endpoints for diagnosing performance issues, memory leaks, and thread contention. Primarily for Java-based servers.

All endpoints are prefixed with `/api/v1/servers/{id}/profiler`.

## Profiler Status

```http
GET /api/v1/servers/{id}/profiler/status
```

Returns whether the profiler is available and active for the server.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers/srv_abc123/profiler/status \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const status = await client.servers.getProfilerStatus('srv_abc123');
```

```python [Python SDK]
status = client.servers.get_profiler_status('srv_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "available": true,
    "active": true,
    "type": "async-profiler",
    "uptime_seconds": 3600
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `NODE_NOT_FOUND` | Node hosting the server not found |

---

## JVM Information

```http
GET /api/v1/servers/{id}/profiler/jvm
```

Returns JVM version, arguments, and runtime information (Java servers only).

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": {
    "jvm_version": "OpenJDK 17.0.10",
    "jvm_args": "-Xms1G -Xmx4G -XX:+UseG1GC",
    "start_time": "2026-05-10T10:00:00Z",
    "uptime_seconds": 7200,
    "pid": 12345
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `PROFILER_NOT_AVAILABLE` | Profiler unavailable (non-Java server) |

---

## Memory Diagnostics

```http
GET /api/v1/servers/{id}/profiler/memory
```

Returns detailed memory usage including heap, non-heap, and memory pool breakdowns.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": {
    "heap_used_mb": 2048,
    "heap_max_mb": 4096,
    "heap_usage_percent": 50.0,
    "non_heap_used_mb": 256,
    "pools": {
      "eden": { "used_mb": 1024, "max_mb": 2048 },
      "survivor": { "used_mb": 128, "max_mb": 256 },
      "old_gen": { "used_mb": 896, "max_mb": 2048 }
    }
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Garbage Collection

```http
GET /api/v1/servers/{id}/profiler/gc
```

Returns garbage collection statistics including collection count, pause times, and throughput.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": {
    "collections": [
      {
        "name": "G1 Young Generation",
        "count": 125,
        "total_pause_ms": 2500,
        "avg_pause_ms": 20
      },
      {
        "name": "G1 Old Generation",
        "count": 5,
        "total_pause_ms": 1500,
        "avg_pause_ms": 300
      }
    ],
    "throughput_percent": 99.2
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Thread Dump

```http
GET /api/v1/servers/{id}/profiler/threads
```

Returns a thread dump showing all active threads and their stack traces.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": {
    "thread_count": 48,
    "daemon_count": 32,
    "peak_count": 52,
    "threads": [
      {
        "name": "Server thread",
        "id": 1,
        "state": "RUNNABLE",
        "cpu_time_ms": 450000,
        "stack_trace": [
          "net.minecraft.server.MinecraftServer.tick",
          "net.minecraft.server.MinecraftServer.run"
        ]
      }
    ]
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Full Report

```http
GET /api/v1/servers/{id}/profiler/full
```

Returns a comprehensive profiling report combining JVM, memory, GC, and thread information.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Debug Logs

```http
POST /api/v1/servers/{id}/profiler/debug-logs
```

Collects debug logs for troubleshooting. Triggers log collection and returns the log data.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "duration_seconds": 30,
  "levels": ["DEBUG", "ERROR"]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Heap Dump

```http
POST /api/v1/servers/{id}/profiler/heap-dump
```

Generates a JVM heap dump for memory analysis. The dump file is stored on the node and can be downloaded via the download endpoint.

⚠️ **Warning:** Generating a heap dump can cause a significant pause on the server (up to several seconds for large heaps).

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/profiler/heap-dump \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const dump = await client.servers.generateHeapDump('srv_abc123');
```

```python [Python SDK]
dump = client.servers.generate_heap_dump('srv_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "dump_id": "hdp_abc123",
    "file_size_mb": 256,
    "status": "generating"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Download Heap Dump

```http
GET /api/v1/servers/{id}/profiler/heap-dump/download
```

Downloads a previously generated heap dump file.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dump_id` | string | Yes | Heap dump ID to download |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `DUMP_NOT_FOUND` | Heap dump not found |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Console & Logs](/api/servers/console) — Server logs and terminal
- [Error Codes](/api/errors) — Complete error code reference
