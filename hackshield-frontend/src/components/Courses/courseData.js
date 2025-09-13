export const courseData = {
  'cyber-security-basics': {
    title: 'Cyber Security Basics',
    description: 'Learn fundamental concepts, common threats, and basic protection strategies.',
    icon: '🛡️',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Cybersecurity',
        content: `
# Introduction to Cybersecurity

## What is Cybersecurity?

Cybersecurity refers to the practice of protecting systems, networks, and data from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.

## Why is Cybersecurity Important?

In today's digital world, cybersecurity is crucial because:

- **Data Protection**: Safeguards sensitive personal and business information
- **Financial Security**: Prevents financial losses from cyber attacks
- **Privacy**: Maintains personal and organizational privacy
- **Business Continuity**: Ensures operations continue without interruption
- **National Security**: Protects critical infrastructure and government systems

## Common Cybersecurity Threats

### 1. Malware
Malicious software designed to damage or gain unauthorized access to computer systems.

### 2. Phishing
Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities.

### 3. Ransomware
Malware that encrypts files and demands payment for their release.

### 4. Social Engineering
Psychological manipulation to trick people into divulging confidential information.

## Key Cybersecurity Principles

1. **Confidentiality**: Ensuring information is accessible only to authorized individuals
2. **Integrity**: Maintaining accuracy and completeness of data
3. **Availability**: Ensuring systems and data are accessible when needed

## Best Practices

- Use strong, unique passwords
- Keep software updated
- Be cautious with email attachments and links
- Use reputable antivirus software
- Regular data backups
- Enable two-factor authentication

Remember: Cybersecurity is everyone's responsibility, not just the IT department's!
        `
      },
      {
        id: 2,
        title: 'Understanding Threats and Vulnerabilities',
        content: `
# Understanding Threats and Vulnerabilities

## Defining Key Terms

### Threat
A potential danger that could exploit a vulnerability to breach security and cause harm.

### Vulnerability
A weakness in a system that can be exploited by a threat to gain unauthorized access or perform malicious actions.

### Risk
The potential for loss or damage when a threat exploits a vulnerability.

## Types of Cyber Threats

### Internal Threats
- Disgruntled employees
- Accidental data breaches
- Insider trading
- Privilege abuse

### External Threats
- Cybercriminals
- Nation-state actors
- Hacktivists
- Competitors

## Common Attack Vectors

### 1. Email-based Attacks
- **Phishing**: Fraudulent emails requesting sensitive information
- **Spear Phishing**: Targeted phishing attacks
- **Business Email Compromise (BEC)**

### 2. Web-based Attacks
- **Drive-by downloads**: Malware installed by visiting infected websites
- **SQL injection**: Exploiting database vulnerabilities
- **Cross-site scripting (XSS)**

### 3. Network-based Attacks
- **Man-in-the-middle attacks**
- **DDoS (Distributed Denial of Service)**
- **Network sniffing**

## Vulnerability Assessment

### Common Vulnerabilities
1. **Unpatched software**
2. **Weak passwords**
3. **Misconfigured systems**
4. **Outdated security protocols**
5. **Insufficient access controls**

### Assessment Methods
- **Vulnerability scanning**
- **Penetration testing**
- **Code reviews**
- **Security audits**

## Risk Management

### Risk Assessment Process
1. **Identify assets**
2. **Identify threats**
3. **Identify vulnerabilities**
4. **Assess impact**
5. **Determine likelihood**
6. **Calculate risk**
7. **Prioritize risks**

Understanding threats and vulnerabilities is the foundation of effective cybersecurity strategy!
        `
      },
      {
        id: 3,
        title: 'Password Security',
        content: `
# Password Security

## The Importance of Strong Passwords

Passwords are often the first line of defense against unauthorized access. Weak passwords are one of the most common security vulnerabilities.

## Characteristics of Strong Passwords

### Length
- Minimum 12 characters
- Longer is generally better
- Each additional character exponentially increases security

### Complexity
- Mix of uppercase and lowercase letters
- Include numbers and special characters
- Avoid predictable patterns

### Uniqueness
- Different password for each account
- Avoid reusing passwords
- Don't use variations of the same password

## Common Password Mistakes

### Weak Passwords
- Dictionary words
- Personal information (birthdays, names)
- Sequential characters (123456, abcdef)
- Common passwords (password, admin, qwerty)

### Poor Password Practices
- Writing passwords down in visible places
- Sharing passwords with others
- Using the same password everywhere
- Never changing passwords

## Creating Strong Passwords

### Passphrase Method
Create a sentence and use the first letter of each word:
"I love to eat pizza on Fridays at 7pm!"
becomes: "IltepooFa7p!"

### Substitution Method
Replace letters with numbers and symbols:
"MySecurePassword123"
becomes: "MyS3cur3P@ssw0rd123"

### Random Generation
Use password managers to generate random passwords:
"K9#mL2$vN8@xQ5"

## Multi-Factor Authentication (MFA)

### What is MFA?
Additional security layer requiring multiple forms of verification:
1. **Something you know** (password)
2. **Something you have** (phone, token)
3. **Something you are** (fingerprint, face)

### Types of MFA
- SMS codes
- Authenticator apps
- Hardware tokens
- Biometric verification

## Password Managers

### Benefits
- Generate strong, unique passwords
- Store passwords securely
- Auto-fill login forms
- Sync across devices
- Monitor for breached passwords

### Popular Password Managers
- LastPass
- 1Password
- Bitwarden
- Dashlane
- KeePass

## Password Policies

### Organizational Guidelines
- Minimum length requirements
- Complexity requirements
- Regular password changes
- Account lockout policies
- Password history restrictions

Remember: A strong password is your first defense against cyber attacks!
        `
      },
      {
        id: 4,
        title: 'Network Security Fundamentals',
        content: `
# Network Security Fundamentals

## What is Network Security?

Network security involves policies and practices designed to prevent unauthorized access, misuse, modification, or denial of network resources and data.

## Network Security Components

### Firewalls
**Purpose**: Control incoming and outgoing network traffic
**Types**:
- Packet-filtering firewalls
- Stateful inspection firewalls
- Application-layer firewalls
- Next-generation firewalls (NGFW)

### Intrusion Detection Systems (IDS)
**Purpose**: Monitor network traffic for suspicious activity
**Types**:
- Network-based IDS (NIDS)
- Host-based IDS (HIDS)

### Intrusion Prevention Systems (IPS)
**Purpose**: Detect and block threats in real-time
**Benefits**:
- Automated threat response
- Reduced manual intervention
- Real-time protection

## Network Protocols and Security

### TCP/IP Security
- **Vulnerabilities**: IP spoofing, TCP hijacking
- **Protections**: IPSec, VPN tunneling

### DNS Security
- **Threats**: DNS poisoning, DDoS attacks
- **Protections**: DNSSEC, DNS filtering

### Email Security
- **Protocols**: SMTP, POP3, IMAP
- **Security measures**: SPF, DKIM, DMARC

## Virtual Private Networks (VPNs)

### What is a VPN?
A secure connection between two networks over the internet, creating an encrypted tunnel for data transmission.

### VPN Benefits
- **Encryption**: Protects data in transit
- **Remote access**: Secure connection from anywhere
- **Privacy**: Hides IP address and location
- **Bypass restrictions**: Access geo-blocked content

### VPN Types
- **Site-to-site VPN**: Connects entire networks
- **Remote access VPN**: Individual user connections
- **Client-to-site VPN**: Connects single devices

## Wireless Network Security

### Wi-Fi Security Protocols
- **WEP**: Outdated and insecure
- **WPA/WPA2**: Current standard
- **WPA3**: Latest and most secure

### Wireless Security Best Practices
- Use strong encryption (WPA2/WPA3)
- Change default passwords
- Hide network SSID
- Enable MAC address filtering
- Regular firmware updates
- Guest network isolation

## Network Monitoring

### Network Traffic Analysis
- **Bandwidth monitoring**
- **Protocol analysis**
- **Behavior analysis**
- **Anomaly detection**

### Security Information and Event Management (SIEM)
Centralized logging and analysis of security events across the network.

## Common Network Attacks

### Man-in-the-Middle (MITM)
Intercepting communication between two parties

### DDoS Attacks
Overwhelming network resources with traffic

### Packet Sniffing
Intercepting and analyzing network packets

### ARP Spoofing
Redirecting network traffic through attacker's system

## Network Segmentation

### Benefits
- Limits attack surface
- Controls access to sensitive resources
- Improves network performance
- Easier compliance management

### Implementation
- VLANs (Virtual Local Area Networks)
- Subnetting
- Network access control (NAC)
- Zero-trust architecture

Network security is the foundation of organizational cybersecurity!
        `
      }
    ]
  },
  'network-security': {
    title: 'Network Security',
    description: 'Understand network protocols, firewalls, VPNs, and secure communication.',
    icon: '🌐',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 1,
        title: 'Advanced Network Protocols',
        content: `
# Advanced Network Protocols

## Understanding Network Layers

### OSI Model Review
The Open Systems Interconnection (OSI) model provides a framework for understanding network communications:

1. **Physical Layer**: Hardware transmission of raw bits
2. **Data Link Layer**: Error detection and correction
3. **Network Layer**: Routing and logical addressing (IP)
4. **Transport Layer**: End-to-end communication (TCP/UDP)
5. **Session Layer**: Session management
6. **Presentation Layer**: Data encryption and formatting
7. **Application Layer**: User interface and services

## Secure Network Protocols

### HTTPS (HTTP Secure)
- **Purpose**: Secure web communications
- **Security**: SSL/TLS encryption
- **Port**: 443
- **Benefits**: Data integrity, authentication, confidentiality

### SFTP (SSH File Transfer Protocol)
- **Purpose**: Secure file transfers
- **Security**: SSH encryption
- **Port**: 22
- **Advantages**: Encrypted file transfers, strong authentication

### SNMPv3 (Simple Network Management Protocol v3)
- **Purpose**: Network device management
- **Security**: Authentication and encryption
- **Improvements**: User-based security model

## Network Security Protocols

### IPSec (Internet Protocol Security)
**Components**:
- **Authentication Header (AH)**: Data integrity and authentication
- **Encapsulating Security Payload (ESP)**: Confidentiality and authentication
- **Internet Key Exchange (IKE)**: Key management

**Modes**:
- **Transport Mode**: Protects payload only
- **Tunnel Mode**: Protects entire IP packet

### SSL/TLS (Secure Sockets Layer/Transport Layer Security)
**Handshake Process**:
1. Client Hello
2. Server Hello and Certificate
3. Key Exchange
4. Certificate Verification
5. Secure Communication Established

## Network Address Translation (NAT) Security

### NAT Benefits
- **IP address conservation**
- **Security through obscurity**
- **Internal network protection**

### NAT Limitations
- **End-to-end connectivity issues**
- **Complex protocol handling**
- **Performance overhead**

## Quality of Service (QoS) and Security

### Traffic Prioritization
- **Voice and video traffic priority**
- **Critical application prioritization**
- **Bandwidth allocation**

### Security Considerations
- **QoS policy enforcement**
- **Traffic classification accuracy**
- **Denial of service prevention**

Advanced protocols form the backbone of secure network communications!
        `
      },
      {
        id: 2,
        title: 'Firewall Configuration and Management',
        content: `
# Firewall Configuration and Management

## Firewall Fundamentals

### What is a Firewall?
A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.

### Firewall Functions
- **Access control**
- **Traffic filtering**
- **Network address translation**
- **Logging and monitoring**
- **Bandwidth management**

## Types of Firewalls

### Packet-Filtering Firewalls
**Characteristics**:
- Examine packet headers
- Make decisions based on IP addresses, ports, and protocols
- Fast processing
- Limited context awareness

**Limitations**:
- Cannot inspect packet contents
- Vulnerable to spoofing attacks
- No application-level filtering

### Stateful Inspection Firewalls
**Features**:
- Track connection states
- Maintain connection tables
- Examine packet context
- More secure than packet filtering

**Advantages**:
- Better security than packet filtering
- Context-aware decisions
- Connection tracking

### Application-Layer Firewalls (Proxy Firewalls)
**Capabilities**:
- Deep packet inspection
- Application protocol analysis
- Content filtering
- User authentication

**Benefits**:
- Highest level of security
- Application-specific controls
- Detailed logging

### Next-Generation Firewalls (NGFW)
**Advanced Features**:
- Intrusion prevention system (IPS)
- Application awareness and control
- User identity integration
- Threat intelligence integration
- SSL inspection

## Firewall Rule Configuration

### Rule Components
- **Source address**
- **Destination address**
- **Service/Port**
- **Action** (Allow/Deny)
- **Direction** (Inbound/Outbound)
- **Time restrictions**

### Rule Order
Rules are processed top to bottom:
1. Most specific rules first
2. Default deny at the end
3. Regular rule optimization

### Example Rule Set
\`\`\`
1. Allow HTTP/HTTPS from any to web servers
2. Allow SSH from admin network to servers
3. Allow DNS from internal to DNS servers
4. Deny all other traffic
\`\`\`

## Firewall Deployment Architectures

### Perimeter Firewall
- **Location**: Network edge
- **Purpose**: First line of defense
- **Protection**: External threats

### Internal Segmentation Firewalls
- **Location**: Between network segments
- **Purpose**: Limit lateral movement
- **Protection**: Internal threats

### Host-Based Firewalls
- **Location**: Individual devices
- **Purpose**: Endpoint protection
- **Configuration**: Device-specific rules

### DMZ (Demilitarized Zone)
**Purpose**: Isolate public-facing services
**Components**:
- External firewall
- DMZ network segment
- Internal firewall
- Public servers (web, email, DNS)

## Firewall Management Best Practices

### Regular Maintenance
- **Rule review and cleanup**
- **Firmware updates**
- **Log analysis**
- **Performance monitoring**

### Documentation
- **Rule documentation**
- **Change management**
- **Network diagrams**
- **Incident procedures**

### Monitoring and Alerting
- **Real-time monitoring**
- **Alert configuration**
- **Automated responses**
- **Incident escalation**

## Common Firewall Bypass Techniques

### Tunneling
- **HTTP tunneling**
- **DNS tunneling**
- **ICMP tunneling**

### Protocol Manipulation
- **Port hopping**
- **Protocol switching**
- **Fragmentation attacks**

### Social Engineering
- **Physical access**
- **Insider threats**
- **Configuration changes**

## Troubleshooting Firewalls

### Common Issues
- **Blocked legitimate traffic**
- **Performance degradation**
- **Configuration errors**
- **Logging problems**

### Diagnostic Tools
- **Packet capture**
- **Connection tracking**
- **Log analysis**
- **Performance metrics**

Proper firewall configuration is essential for network security!
        `
      }
    ]
  },
  'threat-analysis': {
    title: 'Threat Analysis',
    description: 'Advanced threat detection, incident response, and security assessment.',
    icon: '🎯',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 1,
        title: 'Threat Intelligence and Analysis',
        content: `
# Threat Intelligence and Analysis

## What is Threat Intelligence?

Threat intelligence is evidence-based knowledge about existing or emerging threats that can help organizations make informed security decisions.

## Types of Threat Intelligence

### Strategic Threat Intelligence
- **Audience**: Executive leadership
- **Purpose**: Long-term planning and policy decisions
- **Content**: Industry trends, geopolitical factors, risk assessments
- **Timeline**: Months to years

### Tactical Threat Intelligence
- **Audience**: Security teams and analysts
- **Purpose**: Understand attack methods and procedures
- **Content**: TTPs (Tactics, Techniques, Procedures)
- **Timeline**: Weeks to months

### Operational Threat Intelligence
- **Audience**: Security operations center (SOC)
- **Purpose**: Specific campaign or attack attribution
- **Content**: Attack details, indicators, context
- **Timeline**: Days to weeks

### Technical Threat Intelligence
- **Audience**: Technical security staff
- **Purpose**: Immediate detection and response
- **Content**: IoCs (Indicators of Compromise)
- **Timeline**: Hours to days

## Threat Intelligence Sources

### Internal Sources
- **Security logs and events**
- **Incident reports**
- **Vulnerability assessments**
- **Network traffic analysis**

### External Sources
- **Commercial threat feeds**
- **Open source intelligence (OSINT)**
- **Government agencies**
- **Industry sharing groups**
- **Vendor reports**

### Threat Intelligence Platforms
- **MISP (Malware Information Sharing Platform)**
- **OpenCTI**
- **ThreatConnect**
- **Anomali ThreatStream**

## Indicators of Compromise (IoCs)

### File-based IoCs
- **File hashes** (MD5, SHA-1, SHA-256)
- **File names and paths**
- **File sizes**
- **Digital signatures**

### Network IoCs
- **IP addresses**
- **Domain names**
- **URLs**
- **Email addresses**
- **Network patterns**

### Registry IoCs
- **Registry keys and values**
- **Service configurations**
- **Startup entries**

### Behavioral IoCs
- **Process execution patterns**
- **Network communication behaviors**
- **File system activities**
- **User account behaviors**

## MITRE ATT&CK Framework

### Framework Overview
A globally accessible knowledge base of adversary tactics and techniques based on real-world observations.

### ATT&CK Matrix Components

#### Tactics (The "Why")
- **Initial Access**: Getting into the network
- **Execution**: Running malicious code
- **Persistence**: Maintaining foothold
- **Privilege Escalation**: Gaining higher-level permissions
- **Defense Evasion**: Avoiding detection
- **Credential Access**: Stealing credentials
- **Discovery**: Learning about the environment
- **Lateral Movement**: Moving through the network
- **Collection**: Gathering data
- **Exfiltration**: Stealing data
- **Impact**: Destroying or manipulating systems

#### Techniques (The "How")
Specific methods used to achieve tactical objectives

#### Procedures (The "What")
Specific implementations of techniques

## Threat Hunting

### Proactive vs Reactive Security
- **Reactive**: Responding to alerts and incidents
- **Proactive**: Actively searching for threats

### Threat Hunting Process
1. **Hypothesis formation**
2. **Data collection**
3. **Investigation and analysis**
4. **Response and remediation**
5. **Lessons learned**

### Hunting Techniques
- **Indicator-based hunting**
- **Behavioral analysis**
- **Statistical analysis**
- **Machine learning approaches**

## Threat Modeling

### Purpose
Systematic approach to identifying and addressing security threats during design phase.

### Threat Modeling Methodologies
- **STRIDE**: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege
- **PASTA**: Process for Attack Simulation and Threat Analysis
- **VAST**: Visual, Agile, and Simple Threat modeling

### Threat Modeling Steps
1. **Define system scope**
2. **Create architecture overview**
3. **Decompose system**
4. **Identify threats**
5. **Document threats**
6. **Rate threats**

## Advanced Persistent Threats (APTs)

### APT Characteristics
- **Long-term presence**
- **Stealth operations**
- **Targeted attacks**
- **Resource-rich adversaries**
- **Multiple attack vectors**

### APT Lifecycle
1. **Initial reconnaissance**
2. **Initial compromise**
3. **Establish foothold**
4. **Escalate privileges**
5. **Internal reconnaissance**
6. **Lateral movement**
7. **Maintain presence**
8. **Complete mission**

Understanding threats is crucial for effective cybersecurity defense!
        `
      }
    ]
  }
};