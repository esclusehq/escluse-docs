# WARNING: Build context is docs/ — only files under docs/ are available.
# .vitepress/dist is the VitePress build output (markdown → HTML).
# Do NOT change COPY to "." or sensitive root-level files will leak.
FROM nginx:alpine
COPY .vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]