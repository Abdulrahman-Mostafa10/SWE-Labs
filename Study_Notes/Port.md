2024-09-30 09:26

Tags: [[Web]]

# Port

A **port** in networking is a virtual point where network connections start and end. It allows computers to differentiate between multiple services or applications that are running on the same device using the same IP address. Ports work in conjunction with IP addresses to ensure that the data being sent over a network reaches the correct application or service.

### Key Points:

1. **IP Address and Port Relationship**:
   - The **IP address** identifies a specific device (such as a computer or server) on a network, while the **port** identifies a specific application or service running on that device.
   - When data is sent over the internet, it is directed to a particular **IP address**, but the **port number** tells the device which program should receive the data.

   **Example**: 
   - An IP address is like the street address of a building.
   - A port is like the apartment or office number inside that building, directing the delivery to the correct recipient.

2. **Port Numbers**:
   - Port numbers are 16-bit unsigned integers, which means they range from **0** to **65535**.
   - Ports are divided into different ranges, based on how they are used:
     - **Well-Known Ports** (0–1023): Reserved for system services and well-known protocols (e.g., HTTP, FTP, SSH).
     - **Registered Ports** (1024–49151): Assigned to user processes or applications.
     - **Dynamic/Private Ports** (49152–65535): Typically used by applications for temporary, dynamic connections.

3. **Common Port Numbers**:
   - **Port 80**: HTTP (Web traffic without encryption).
   - **Port 443**: HTTPS (Encrypted web traffic).
---
   - **Port 22**: SSH, and SFTP (Secure Shell, for remote access).
   - **Port 25**: SMTP (Simple Mail Transfer Protocol, for email).
   - **Port 53**: DNS (Domain Name System).
   - **Port 110**: POP3 (Post Office Protocol, for retrieving email).
   - **Port 3306**: MySQL database.
   - **Port 3389**: RDP (Remote Desktop Protocol, for remote access to Windows systems).

4. **TCP and UDP Ports**:
   - Ports work with two main transport layer protocols: **TCP (Transmission Control Protocol)** and **UDP (User Datagram Protocol)**. Both use ports to handle data connections, but they differ in their approach:
     - **TCP**: Connection-oriented, reliable transmission of data. Examples include HTTP, HTTPS, and FTP.
     - **UDP**: Connectionless, faster but less reliable. Often used for services like video streaming, online gaming, and DNS.

   Each protocol uses the same port number ranges, but TCP and UDP ports are distinct. For example, TCP Port 80 (HTTP) and UDP Port 80 are different from each other.

5. **How Ports Work**:
   - When a device sends data to another device over the internet or a local network, the data packet includes both the **IP address** and the **port number**.
   - The receiving device uses the port number to route the data to the correct application or service.
   - For example, when you access a website using `http://example.com`, your browser communicates with the web server at **port 80** (the default port for HTTP traffic).

6. **Port Scanning**:
   - **Port scanning** is the process of systematically checking a device's open ports to identify which services are running or to check for vulnerabilities. This can be a security measure, but it is also used by attackers to find open ports that can be exploited.

7. **Firewalls and Ports**:
   - **Firewalls** manage and control incoming and outgoing network traffic by analyzing data packets and determining whether they should be allowed or blocked based on security rules. These rules often specify which **ports** are allowed or denied access.
   - For example, a firewall might block all incoming traffic except for traffic on port 443 (for secure web traffic).

### Example:

When you type `www.example.com` in your browser:
- Your browser connects to the server at `example.com` on **port 80** (HTTP) or **port 443** (HTTPS).
- The server responds by sending the website data, and your browser displays the website.

If you were sending an email:
- Your email client would connect to a mail server on **port 25** (SMTP) to send the message.

### Summary:

A **port** is a numerical label used to identify specific applications or services on a networked device. It allows multiple services (like web browsing, email, and file transfers) to run on the same device, using the same IP address, without interference.

