---
title: Postman
---

[Postman Website](https://www.postman.com/)

Supported on Windows, Mac and Linux.

> Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.

## Functionalities
1. Syncing saved web requests (group as collections)
2. Teamwork
3. Mock server
	1. Mock servers let you simulate endpoints and their corresponding responses in a collection without actually setting up a back end.
	2. User define the default return value, postman will give you a mock server url. Developer could use the mock API to developer without a finished backend.
5. Monitor
	1. A monitor lets you run a collection periodically to check for its performance and response
6. Build nice-looking documentation websites
7. Environments: define environment variables such as API key, protocol, port number, etc.
8. GraphQL Support
   1. Import GraphQL schema file generated by codegen
   2. Support auto-fetch if a GraphQL server is up (new changes to schema will be reflected in postman)
9. WebSocket + Socket.IO support
   1. See [Postman Now Supports Socket.IO](https://blog.postman.com/postman-now-supports-socket-io/)
   2. See [Using WebSocket Requests](https://learning.postman.com/docs/sending-requests/supported-api-frameworks/websocket/)
   3. **Handshake path** can be set within **Settings**, do not include it in url
   4. Socket.IO namespace can be set within URL right after hostname and port (i.e. `<hostname>:<port>/<namespace>`)
   5. After connecting, you can subscribe to events with listeners
   6. You can also send messages


