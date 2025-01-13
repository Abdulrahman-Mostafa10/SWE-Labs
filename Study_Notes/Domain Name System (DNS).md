2024-09-30 09:20

Tags: [[Web]]

Prerequisites: [[Domain Name]]

# Domain Name System (DNS)

## Main Info

The **Domain Name System (DNS)** is a system that translates human-readable domain names (like `www.example.com`) into machine-readable IP addresses (like `192.0.2.1`). It serves as the "phonebook" of the internet, allowing users to access websites using easily recognizable names instead of remembering numerical IP addresses.

## Additional Info
### How DNS Works:

1. **User Enters a Domain Name**:
   - When a user types a domain name (e.g., `www.example.com`) into their browser, the browser needs to know the IP address of the server hosting that website.

2. **DNS Lookup**:
   - The browser checks if it has the IP address for the domain stored in its **cache**. If it doesn’t, it initiates a DNS lookup to find the IP address associated with the domain.

3. **Recursive Resolver**:
   - The browser contacts a **DNS resolver** (usually provided by the user's Internet Service Provider or third-party DNS services like Google Public DNS or Cloudflare) to start the process of resolving the domain name.

4. **Querying DNS Servers**:
   - The resolver queries various DNS servers in a hierarchical order:
     1. **Root DNS Servers**: These servers handle requests for the top-level domains (TLDs) and direct the resolver to the appropriate **TLD server**.
     2. **TLD DNS Servers**: These servers handle requests for domains within a specific TLD (like `.com` or `.org`). They direct the resolver to the authoritative DNS server for the specific domain.
     3. **Authoritative DNS Server**: This is the server that holds the DNS records for the specific domain (e.g., `example.com`). It provides the IP address associated with the domain.

5. **Returning the IP Address**:
   - The authoritative DNS server returns the IP address (e.g., `192.0.2.1`) to the DNS resolver, which then passes it to the browser.

6. **Connecting to the Server**:
   - The browser uses the returned IP address to connect to the web server hosting the website, and the website is displayed to the user.

### DNS Record Types:

DNS relies on several types of records to function. Common DNS record types include:

- **A Record (Address Record)**: Maps a domain name to an IPv4 address.
- **AAAA Record**: Maps a domain name to an IPv6 address.
- **CNAME Record (Canonical Name Record)**: Redirects one domain name to another. For example, `www.example.com` might point to `example.com`.
- **MX Record (Mail Exchange Record)**: Specifies the mail server responsible for receiving emails for a domain.
- **TXT Record**: Allows domain owners to insert arbitrary text, often used for verification purposes or email security protocols (like SPF and DKIM).
- **NS Record (Name Server Record)**: Specifies the authoritative DNS servers for the domain.

### DNS Caching:

To improve performance and reduce DNS server load, DNS results are often cached at various levels:

- **Browser Cache**: Browsers temporarily store DNS results, so repeated visits to the same domain don’t require another DNS lookup.
- **Operating System Cache**: The operating system can cache DNS records as well, further reducing the need for DNS queries.
- **DNS Resolver Cache**: DNS resolvers (provided by ISPs or third-party services) cache responses for commonly accessed domains.

The **Time to Live (TTL)** value associated with DNS records determines how long a result should be cached before the system checks for an updated record.

### DNS and Security:

1. **DNS Spoofing**:
   - Attackers can manipulate DNS records to redirect traffic from legitimate sites to malicious ones. This is called **DNS spoofing** or **cache poisoning**.

2. **DNSSEC (DNS Security Extensions)**:
   - To prevent such attacks, DNSSEC adds a layer of security by allowing DNS responses to be verified through cryptographic signatures, ensuring their authenticity.

### Example:

When you type `www.example.com` into a browser:
- The DNS resolver might return an IP address like `93.184.216.34`.
- Your browser then uses that IP to connect to the server, and the web page for `example.com` is displayed.

In essence, DNS makes navigating the internet intuitive by converting easy-to-remember domain names into IP addresses, which computers use to communicate.