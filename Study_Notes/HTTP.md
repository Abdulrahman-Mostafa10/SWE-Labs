2024-09-30 09:34

Tags: [[Web]]

# HTTP

**HTTP** (Hypertext Transfer Protocol) is a standard *protocol* used for *transferring and receiving* information on the web. It defines how messages are *formatted and transmitted*, and how web servers and browsers respond to various commands. *HTTP operates as a request-response system*, where a client (e.g., browser) sends requests for resources, and a server provides responses containing the requested data (e.g., HTML, images) and status information. 

HTTP typically uses TCP/IP (Reliable):
- **Acknowledge**
  The other side must acknowledge that it has received the request/response
- **Retry**
  You can retry a specific number of times
- **Chunks**
  - The message is divided into chunks and each is send separately
  - Contain index, so it is not necessary to send or receive them in order
  - If one is missing or corrupted, it can be resent separately
  
